using System.Collections.Generic;
using System.Web.Http;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Server.Controllers.Api
{
    [System.Web.Mvc.Authorize] public class SkillGroupController : BaseRepositoryController
    {
        public SkillGroupController(IRepositoryFactory repositoryFactory) : base(repositoryFactory)
        {
        }

        public SkillGroupController()
        {
        }

        public IList<SkillGroup> GetAll()
        {
            var repo = RepositoryFactory.CreateSkillGroupRepository();
            var ret = repo.GetAll();
            return ret;
        }

        [System.Web.Mvc.HttpPost] public void Add([FromBody] SkillGroup skillGroup)
        {
            var repo = RepositoryFactory.CreateSkillGroupRepository();
            repo.Add(skillGroup);
        }

        [System.Web.Mvc.HttpPost] public void Update([FromBody] SkillGroup skillGroup)
        {
            var repo = RepositoryFactory.CreateSkillGroupRepository();
            repo.Update(skillGroup);
        }
    }
}