using System;
using System.Data;
using System.Data.SqlClient;
using Logotrainer.Model.Interfaces;

namespace Logotrainer.Persistence.Repositories
{
    public class RepositoryFactory : IRepositoryFactory
    {
        public RepositoryFactory(string connectionString) : this(() => new SqlConnection(connectionString))
        {
        }

        public RepositoryFactory(Func<IDbConnection> connectionFactory)
        {
            this.ConnectionFactory = connectionFactory;
        }

        protected Func<IDbConnection> ConnectionFactory { get; private set; }

        protected IDbConnection Connection
        {
            get { return ConnectionFactory(); }
        }

        public ISkillGroupRepository CreateSkillGroupRepository()
        {
            return new SkillGroupRepository(Connection);
        }

        public ISkillRepository CreateSkillRepository()
        {
            return new SkillRepository(Connection);
        }

        public IUserRepository CreateUserRepository()
        {
            return new UserRepository(Connection);
        }

        public IKidSetRepository CreateKidSetRepository()
        {
            return new KidSetRepository(Connection);
        }

        public void Dispose()
        {
        }
    }
}