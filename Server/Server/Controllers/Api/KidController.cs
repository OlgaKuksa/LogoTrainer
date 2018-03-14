using System;
using System.Collections.Generic;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;
using Microsoft.AspNet.Identity;

namespace Logotrainer.Server.Controllers.Api
{
    [System.Web.Mvc.Authorize] public class KidController : BaseRepositoryController
    {
        public KidController(IRepositoryFactory repositoryFactory) : base(repositoryFactory)
        {
        }

        public KidController()
        {
        }

        public IList<Kid> GetAll()
        {
            return KidRepository.GetByLogoUserId(new Guid(User.Identity.GetUserId()));
        }

        [System.Web.Mvc.HttpPost] public void Add(Kid kid)
        {
            KidRepository.Add(kid);
        }

        private IKidRepository KidRepository
        {
            get { return RepositoryFactory.CreateKidRepository(); }
        }
    }
}