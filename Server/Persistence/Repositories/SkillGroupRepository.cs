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

        private const string getAllSql = "SELECT newid() as SkillGroupId, 'test me' as SkillGroupName";

        public IList<SkillGroup> GetAll()
        {
            var ret = Connection.Query<SkillGroup>(getAllSql);
            return ret.ToList();
        }
    }
}