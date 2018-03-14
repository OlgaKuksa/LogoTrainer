using System;
using System.Collections.Generic;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;
using Microsoft.AspNet.Identity;

namespace Logotrainer.Server.Controllers.Api
{
    [System.Web.Mvc.Authorize] public class GroupController : BaseRepositoryController
    {
        public GroupController(IRepositoryFactory repositoryFactory) : base(repositoryFactory)
        {
        }

        public GroupController()
        {
        }


        public IList<Group> GetAll()
        {
            var userId = User.Identity.GetUserId();
            if(userId==null) return new List<Group>();
            return GroupRepository.FindGroupsByLogoUserId(new Guid(userId));
        }

        private IGroupRepository GroupRepository
        {
            get { return RepositoryFactory.CreateGroupRepository(); }
        }
    }
}