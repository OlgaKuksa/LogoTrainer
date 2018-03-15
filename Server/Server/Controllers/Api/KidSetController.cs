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

        [HttpPost] public IList<KidSet> FindByKid(Kid kid)
        {
            return KidSetRepository.FindByKid(kid);
        }

        private IKidSetRepository KidSetRepository
        {
            get { return RepositoryFactory.CreateKidSetRepository(); }
        }
    }

    public class KidProfileController : BaseRepositoryController
    {
        public KidProfileController()
        {
        }

        public KidProfileController(IRepositoryFactory repositoryFactory) : base(repositoryFactory)
        {
        }

        public void Add(KidProfile kidProfile)
        {
            KidProfileRepository.Add(kidProfile);
        }

        public IList<KidProfile> FindByKid(Kid kid)
        {
            return KidProfileRepository.FindByKidId(kid.KidId);
        }

        public IKidProfileRepository KidProfileRepository { get
            {
                return RepositoryFactory.CreateKidProfileRepository();
            } }
    }
}