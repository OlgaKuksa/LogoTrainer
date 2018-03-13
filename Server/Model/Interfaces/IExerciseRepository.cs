using System;
using System.Collections.Generic;
using Logotrainer.Model.Operation;

namespace Logotrainer.Model.Interfaces
{
    public interface IExerciseRepository
    {
        IList<Exercise> FindByLevelId(Guid mainLevelId);
    }

    public interface IKidSetRepository
    {
        void Add(KidSet kidSet);
        KidSet GenerateNewKidSet(Guid kidId, IList<Guid> skillIds, bool excludeOld = true);
    }
}