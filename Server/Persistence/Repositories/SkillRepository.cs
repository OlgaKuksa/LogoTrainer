using Logotrainer.Model.Interfaces;
using System.Data;
using Dapper;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class SkillRepository : BaseRepository, ISkillRepository
    {
        public SkillRepository(IDbConnection connection) : base(connection)
        {


        }

        public void Add(Skill skill)
        {
            Connection.Execute(SkillSql.Add, skill);
            //TODO: add levels
        }

        public void Update(Skill skill)
        {
            Connection.Execute(SkillSql.Update, skill);
            //TODO: update levels
        }

        public void Remove(Skill skill)
        {
            Connection.Execute(SkillSql.Remove, skill);
        }
    }
}