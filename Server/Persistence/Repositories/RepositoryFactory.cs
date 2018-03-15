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

        public IKidRepository CreateKidRepository()
        {
            return new KidRepository(Connection);
        }

        public IGroupRepository CreateGroupRepository()
        {
            return new GroupRepository(Connection);
        }

        public IKidSetRepository CreateKidSetRepository()
        {
            return new KidSetRepository(Connection);
        }

        public IExerciseRepository CreateExerciseRepository()
        {
            return new ExerciseRepository(Connection);
        }

        public IKidProfileRepository CreateKidProfileRepository()
        {
            return new KidProfileRepository(Connection);
        }

        public void Dispose()
        {
        }
    }
}