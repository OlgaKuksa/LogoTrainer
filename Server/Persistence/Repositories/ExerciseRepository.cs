using System;
using System.Collections.Generic;
using System.Data;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
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