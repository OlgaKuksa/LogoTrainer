using System.Web.Mvc;
using Logotrainer.Model.Interfaces;

namespace Server.Controllers.Api
{
    [Authorize] public class SkillGroupController : BaseRepositoryController
    {
        public SkillGroupController(IRepositoryFactory repositoryFactory) : base(repositoryFactory)
        {
        }

        public SkillGroupController()
        {
        }

        public ActionResult Index()
        {
            return Content("{}", "application/json");
        }

        public ActionResult GetAll()
        {
            var repo = RepositoryFactory.CreateSkillGroupRepository();
            var ret = repo.GetAll();
            return SmartJson(ret);
        }
    }
}