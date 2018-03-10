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
        public SkillGroupRepository(IDbConnection connection) : base(connection)
        {
        }

        public IList<SkillGroup> GetAll()
        {
            var shouldOpenConnection = Connection.State != ConnectionState.Open;
            if (shouldOpenConnection)
                Connection.Open();
            var ret = Connection.Query<SkillGroup>(SkillGroupSql.GetAll).ToList();
            foreach (var skillGroup in ret)
            {
                skillGroup.Skills = GetSkillsBySkillGroupId(skillGroup.SkillGroupId);
            }
            if (shouldOpenConnection)
                Connection.Close();
            return ret.ToList();
        }

        public void Add(SkillGroup skillGroup)
        {
            var shouldOpenConnection = Connection.State != ConnectionState.Open;
            if (shouldOpenConnection)
                Connection.Open();
            Connection.Execute(
                SkillGroupSql.Add,
                skillGroup);
            if (shouldOpenConnection)
                Connection.Close();
        }

        public void Update(SkillGroup skillGroup)
        {
            var shouldOpenConnection = Connection.State != ConnectionState.Open;
            if (shouldOpenConnection)
                Connection.Open();
            Connection.Execute(
                SkillGroupSql.Update,
                skillGroup);
            if (shouldOpenConnection)
                Connection.Close();
        }

        public void Remove(SkillGroup skillGroup)
        {
            Connection.Execute(SkillGroupSql.Remove, skillGroup);
        }

        private IList<Skill> GetSkillsBySkillGroupId(Guid skillGroupId)
        {
            var skillsBySkillGroupId = Connection
                .Query<Skill>(SkillGroupSql.GetSkillsBySkillGroupId, new {SkillGroupId = skillGroupId}).ToList();
            foreach (var skill in skillsBySkillGroupId)
            {
                skill.SkillLevels = GetLevelsBySkillId(skill.SkillId);
            }
            return skillsBySkillGroupId;
        }

        private IList<Level> GetLevelsBySkillId(Guid skillId)
        {
            return Connection.Query<Level>(SkillGroupSql.GetLevelsBySkillId, new {SkillId = skillId}).ToList();
        }
    }
}