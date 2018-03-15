using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class KidSetRepository : BaseRepository, IKidSetRepository
    {
        public KidSetRepository(IDbConnection connection) : base(connection)
        {
        }

        public void Add(KidSet kidSet)
        {
            var shouldOpenConnection = Connection.State != ConnectionState.Open;
            if (shouldOpenConnection)
                Connection.Open();
            Connection.Execute(@"INSERT INTO [KidSet]([KidId].[KidSetId],[CreateDateTime])
VALUES (@KidId,@KidSetId,@CreateDateTime)", kidSet);
            if (kidSet.ExerciseIdsInSet != null)
                foreach (var exerciseId in kidSet.ExerciseIdsInSet)
                {
                    Connection.Execute(@"INSERT INTO [KidSetExercise]([KidSetId],[ExerciseId])
VALUES (@KidSetId,@ExerciseId)", new {kidSet.KidSetId, ExerciseId = exerciseId});
                }
            if (shouldOpenConnection)
                Connection.Close();
        }

        public KidSet GenerateNewKidSet(Guid kidId, IList<Guid> skillIds, bool excludeOld = true)
        {
            var shouldOpenConnection = Connection.State != ConnectionState.Open;
            if (shouldOpenConnection)
                Connection.Open();
            var oldExerciseIds = FindExerciseIdsByKidId(kidId);
            var allExercises = FindAllExercisesByKidIdAndSkillIds(kidId, skillIds);
            if (shouldOpenConnection)
                Connection.Close();
            var newExercises = allExercises.GroupBy(it => it.ExerciseMainLevelId).Select(gr =>
                gr.ToList()).Select(exerciseList =>
            {
                if (exerciseList.Count == 1) return exerciseList[0];
                if (excludeOld)
                    exerciseList = exerciseList.Where(it => !oldExerciseIds.Contains(it.ExerciseId)).ToList();
                return exerciseList.OrderByDescending(it =>
                    (it.ExerciseSecondarySkills ?? Enumerable.Empty<Guid>()).Intersect(skillIds).Count()).First();
            }).Where(it => it != null).Select(it => it.ExerciseId).ToList();
            return new KidSet {KidSetId = Guid.NewGuid(), KidId = kidId, ExerciseIdsInSet = newExercises};
        }

        public IList<KidSet> FindByKid(Kid kid)
        {
            var shouldOpenConnection = Connection.State != ConnectionState.Open;
            if (shouldOpenConnection)
                Connection.Open();
            var ret = Connection.Query<KidSet>(@"SELECT [KidId],[KidSetId],[CreateDateTime]
FROM [KidSet] WHERE [KidId]=@KidId", kid).ToList();
            foreach (var kidSet in ret)
            {
                kidSet.ExerciseIdsInSet = FindExerciseIdsInSet(kidSet);
            }
            if (shouldOpenConnection)
                Connection.Close();
            return ret;
        }

        private IList<Guid> FindExerciseIdsInSet(KidSet kidSet)
        {
            return Connection
                .Query<Guid>("SELECT [ExerciseId] FROM [KidSetExercise] WHERE [KidSetId]=@KidSetId", kidSet).ToList();
        }

        private IList<Exercise> FindAllExercisesByKidIdAndSkillIds(Guid kidId, IList<Guid> skillIds)
        {
            if (!skillIds.Any()) return new List<Exercise>();
            var kidProfileId = FindLastKidProfileId(kidId);

            if (kidProfileId == default(Guid)) return new List<Exercise>();
            var ret = Connection.Query<Exercise>(
                @"SELECT DISTINCT e.[ExerciseId], e.[LevelId] as [ExerciseMainLevelId] FROM [Exercise] e
INNER JOIN [TestResult] tr
ON e.[LevelId]=tr.[LevelId]
WHERE e.[IsArchived]=0
AND tr.[KidProfileId]=@KidProfileId
AND tr.[SkillId] IN @SkillIds",
                new {KidId = kidId, KidProfileId = kidProfileId, SkillIds = skillIds}).ToList();
            foreach (var exercise in ret)
            {
                exercise.ExerciseSecondarySkills = FindExerciseSecondarySkills(exercise.ExerciseId);
            }
            return ret;
        }

        private IList<Guid> FindExerciseSecondarySkills(Guid exerciseId)
        {
            return Connection
                .Query<Guid>("SELECT [SkillId] FROM [ExerciseSecondarySkill] WHERE [ExerciseId]=@ExerciseId",
                    new {ExerciseId = exerciseId}).ToList();
        }

        private Guid FindLastKidProfileId(Guid kidId)
        {
            return Connection.QueryFirstOrDefault<Guid>(@"SELECT TOP(1) [KidProfileId] FROM [KidProfile]
WHERE [KidId]=@KidId
ORDER BY [CreateDateTime] DESC", new {KidId = kidId});
        }

        private IList<Guid> FindExerciseIdsByKidId(Guid kidId)
        {
            return Connection.Query<Guid>(
                @"SELECT DISTINCT kse.[ExerciseId] FROM [KidSetExercise] kse
INNER JOIN [KidSet] ks
ON kse.[KidSetId]=ks.[KidSetId]
WHERE [KidId]=@KidId", new {KidId = kidId}).ToList();
        }
    }
}