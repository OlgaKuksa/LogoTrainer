using System.Data;
using Dapper;
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
            Connection.Execute(@"UPDATE [User]
SET [Password]=@Password
WHERE [UserId]=@UserId", user);
        }

        public User FindById(string userId)
        {
            return Connection.QuerySingleOrDefault<User>(
                "SELECT [UserId],[LoginId],[Password],[FirstName],[LastName],[Role] FROM [User] WHERE [UserId]=@UserId",
                new {UserId = userId});
        }

        public User FindByLoginId(string loginId)
        {
            return Connection.QuerySingleOrDefault<User>(
                "SELECT [UserId],[LoginId],[Password],[FirstName],[LastName],[Role] FROM [User] WHERE [LoginId]=@LoginId",
                new { LoginId = loginId });
        }
    }
}