using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;
using Microsoft.AspNet.Identity;

namespace Logotrainer.Server.Controllers.Api
{
    [Authorize] public class ExerciseController : BaseRepositoryController
    {
        public ExerciseController(IRepositoryFactory repositoryFactory) : base(repositoryFactory)
        {
        }

        public ExerciseController()
        {
        }

        [HttpPost] public IList<Exercise> FindByKidSet(KidSet kidSet)
        {
            return ExerciseRepository.FindByKidSet(kidSet);
        }

        public void Add(Exercise exercise)
        {
            var userId = new Guid(User.Identity.GetUserId());
            exercise.UserId = userId;

            ExerciseRepository.Add(exercise);
        }

        public void Update(Exercise exercise)
        {
            ExerciseRepository.Update(exercise);
        }

        public void Remove(Exercise exercise)
        {
            ExerciseRepository.Remove(exercise);
        }

        public IList<Exercise> FindByFilter(ExerciseFilter filter)
        {
            return ExerciseRepository.FindByLevelId(filter.MainLevelId);
        }

        private IExerciseRepository ExerciseRepository
        {
            get { return RepositoryFactory.CreateExerciseRepository(); }
        }
    }
}