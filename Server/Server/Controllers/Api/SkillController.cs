using System.Collections.Generic;
using System.Web.Http;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Server.Controllers.Api
{
    [System.Web.Mvc.Authorize] public class SkillController : BaseRepositoryController
    {
        public SkillController(IRepositoryFactory repositoryFactory) : base(repositoryFactory)
        {
        }

        public SkillController()
        {
        }

        [System.Web.Mvc.HttpPost] public void Add([FromBody] Skill skill)
        {
            SkillRepository.Add(skill);
        }

        

        [System.Web.Mvc.HttpPost] public void Remove([FromBody] Skill skill)
        {
            SkillRepository.Remove(skill);
        }

        [System.Web.Mvc.HttpPost] public void Update([FromBody] Skill skill)
        {
            SkillRepository.Update(skill);
        }

        private ISkillRepository SkillRepository
        {
            get { return RepositoryFactory.CreateSkillRepository(); }
        }
    }
}