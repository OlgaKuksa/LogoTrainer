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

        [System.Web.Mvc.HttpPost] public void Add([FromBody] SkillGroup skillGroup)
        {
            SkillGroupRepository.Add(skillGroup);
        }

        public IList<SkillGroup> GetAll()
        {
            return SkillGroupRepository.GetAll();
        }

        [System.Web.Mvc.HttpPost] public void Remove([FromBody] SkillGroup skillGroup)
        {
            SkillGroupRepository.Remove(skillGroup);
        }

        [System.Web.Mvc.HttpPost] public void Update([FromBody] SkillGroup skillGroup)
        {
            SkillGroupRepository.Update(skillGroup);
        }

        private ISkillGroupRepository SkillGroupRepository
        {
            get { return RepositoryFactory.CreateSkillGroupRepository(); }
        }
    }
}