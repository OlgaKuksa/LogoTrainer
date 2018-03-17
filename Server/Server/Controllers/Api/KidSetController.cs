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
            if (kidSet.ExerciseIdsInSet == null || kidSet.ExerciseIdsInSet.Count == 0)
                return kidSet;
            kidSet.CreateDateTime = DateTime.UtcNow;
            KidSetRepository.Add(kidSet);
            return kidSet;
        }

        [HttpPost] public void Remove(KidSet kidSet)
        {
            //TODO
        }

        [HttpPost] public IList<KidSet> FindByKid(Kid kid)
        {
            return KidSetRepository.FindByKid(kid);
        }

        private IKidSetRepository KidSetRepository
        {
            get { return RepositoryFactory.CreateKidSetRepository(); }
        }
    }
}