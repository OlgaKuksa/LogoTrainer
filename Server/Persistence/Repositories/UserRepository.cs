using System.Data;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IDbConnection connection) : base(connection)
        {
        }

        public void Add(User user)
        {
            //throw new System.NotImplementedException();
        }

        public void Update(User user)
        {
            //throw new System.NotImplementedException();
        }
    }
}