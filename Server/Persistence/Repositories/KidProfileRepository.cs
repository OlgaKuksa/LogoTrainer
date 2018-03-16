using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class KidProfileRepository : BaseRepository, IKidProfileRepository
    {
        public KidProfileRepository(IDbConnection connection) : base(connection)
        {
        }

        public void Add(KidProfile kidProfile)
        {
            var shouldOpen = Connection.State != ConnectionState.Open;
            if (shouldOpen)
                Connection.Open();
            Connection.Execute(@"INSERT INTO [KidProfile]([KidId],[KidProfileId],[CreateDateTime])
VALUES (@KidId,@KidProfileId,@CreateDateTime)", kidProfile);
            if (kidProfile.TestResult != null)
                foreach (var kv in kidProfile.TestResult)
                {
                    Connection.Execute(@"INSERT INTO [TestResult]([KidProfileId],[SkillId],[LevelId])
VALUES (@KidProfileId,@SkillId,@LevelId)", new {kidProfile.KidProfileId, SkillId = kv.Key, LevelId = kv.Value});
                }
            if (shouldOpen)
                Connection.Close();
        }

        public IList<KidProfile> FindByKidId(Guid kidId)
        {
            var shouldOpen = Connection.State != ConnectionState.Open;
            if (shouldOpen)
                Connection.Open();
            var ret = Connection
                .Query<KidProfile>(
                    "SELECT [KidId],[KidProfileId],[CreateDateTime] FROM [KidProfile] WHERE [KidId]=@KidId",
                    new {KidId = kidId}).ToList();
            foreach (var kidProfile in ret)
            {
                kidProfile.TestResult = FindTestResultsByKidProfile(kidProfile);
            }
            if(shouldOpen)
                Connection.Close();
            return ret;
        }

        private IDictionary<Guid, Guid> FindTestResultsByKidProfile(KidProfile kidProfile)
        {
            return Connection
                .Query<KeyValuePair<Guid, Guid>>(
                    "SELECT [SkillId] AS [Key], [LevelId] AS [Value] FROM [TestResult] WHERE [KidProfileId]=@KidProfileId",
                    kidProfile).ToDictionary(kv => kv.Key, kv => kv.Value);
        }
    }
}