using System;
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

        private IKidSetRepository KidSetRepository
        {
            get { return RepositoryFactory.CreateKidSetRepository(); }
        }
    }
}