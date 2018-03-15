using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

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

        public void Dispose()
        {
        }
    }

    public class ExerciseRepository : BaseRepository, IExerciseRepository
    {
        public ExerciseRepository(IDbConnection connection):base(connection)
        {
            
        }

        public IList<Exercise> FindByLevelId(Guid mainLevelId)
        {
            throw new NotImplementedException();
        }

        public IList<Exercise> FindByKidSet(KidSet kidSet)
        {
            throw new NotImplementedException();
        }

        public void Add(Exercise exercise)
        {
            throw new NotImplementedException();
        }

        public void Update(Exercise exercise)
        {
            throw new NotImplementedException();
        }

        public void Remove(Exercise exercise)
        {
            throw new NotImplementedException();
        }
    }
}