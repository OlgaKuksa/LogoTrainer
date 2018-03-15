using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Server.Controllers.Api
{
    [Authorize] public class KidSetController : BaseRepositoryController
    {
        public KidSetController(IRepositoryFactory repositoryFactory) : base(repositoryFactory)
        {
        }

        public KidSetController()
        {
        }

        [HttpPost] public KidSet GenerateKidSet(GenerateKidSetParameter parameter)
        {
            var kidSet = KidSetRepository.GenerateNewKidSet(parameter.KidId, parameter.SkillIds, true);
            kidSet.CreateDateTime = DateTime.UtcNow;
            KidSetRepository.Add(kidSet);
            return kidSet;
        }

        [HttpPost] public void Remove(KidSet kidSet)
        {
            //TODO
        }

        [HttpPost] public IList<KidSet> FindByKid(Kid Kid)
        {
            throw new NotImplementedException();
        }

        private IKidSetRepository KidSetRepository
        {
            get { return RepositoryFactory.CreateKidSetRepository(); }
        }
    }

    [Authorize] public class ExerciseController : BaseRepositoryController
    {
        [HttpPost] public IList<Exercise> FindByKidSet(KidSet kidSet)
        {
            throw new NotImplementedException();
        }

        public void Add(Exercise exercise)
        {
            
        }

        public void Update(Exercise exercise)
        {
            
        }

        public void Remove(Exercise exercise)
        {
            
        }

        public IList<Exercise> FindByFilter(ExerciseFilter filter)
        {
            throw new NotImplementedException();
        }
    }

    public class ExerciseFilter
    {
        public Guid MainLevelId { get; set; }
    }

    public class KidProfileController : BaseRepositoryController
    {
        public void Add(KidProfile kidProfile)
        {
            
        }

        public IList<KidProfile> FindByKid(Kid kid)
        {
            throw new NotImplementedException();
        }
    }
}