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

        [System.Web.Mvc.HttpPost] public void Add(Skill skill)
        {
            SkillRepository.Add(skill);
        }

        [System.Web.Mvc.HttpPost] public SkillRemoveResult Remove(Skill skill)
        {
            var ret = new SkillRemoveResult
            {
                SkillId = skill.SkillId,
                SkillGroupId = skill.SkillGroupId,
                FailedToRemove = !SkillRepository.Remove(skill)
            };
            return ret;
        }

        [System.Web.Mvc.HttpPost] public void Update(Skill skill)
        {
            SkillRepository.Update(skill);
        }

        private ISkillRepository SkillRepository
        {
            get { return RepositoryFactory.CreateSkillRepository(); }
        }
    }
}