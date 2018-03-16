using System.Collections.Generic;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Server.Controllers.Api
{
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