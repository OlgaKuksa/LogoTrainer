using System;
using System.Collections.Generic;
using Logotrainer.Model.Operation;

namespace Logotrainer.Model.Interfaces
{
    public interface IExerciseRepository
    {
        IList<Exercise> FindByLevelId(Guid mainLevelId);
        IList<Exercise> FindByKidSet(KidSet kidSet);
        void Add(Exercise exercise);
        void Update(Exercise exercise);
        void Remove(Exercise exercise);
    }
}