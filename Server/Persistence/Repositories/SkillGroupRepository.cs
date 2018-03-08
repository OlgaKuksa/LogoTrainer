using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class SkillGroupRepository : BaseRepository, ISkillGroupRepository
    {
        public SkillGroupRepository(IDbConnection connection): base(connection)
        {
        }

        private const string getAllSql = "SELECT SkillGroupId, SkillGroupName FROM [SkillGroup]";

        private const string getSkillsBySkillGroupIdSql =
            "SELECT SkillGroupId, SkillId, SkillName,SkillQuestion FROM [Skill] WHERE [SkillGroupId]=@SkillGroupId";

        public IList<SkillGroup> GetAll()
        {
            var shouldOpenConnection = Connection.State != ConnectionState.Open;
            if(shouldOpenConnection)
                Connection.Open();
            var ret = Connection.Query<SkillGroup>(getAllSql).ToList();
            foreach (var skillGroup in ret)
            {
                skillGroup.Skills = GetSkillsBySkillGroupId(skillGroup.SkillGroupId);
            }
            if(shouldOpenConnection)
                Connection.Close();
            return ret.ToList();
        }

        private IList<Skill> GetSkillsBySkillGroupId(Guid skillGroupId)
        {
            return Connection.Query<Skill>(getSkillsBySkillGroupIdSql, new {SkillGroupId = skillGroupId}).ToList();
        }
    }
}