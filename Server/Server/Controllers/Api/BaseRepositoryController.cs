using System.Web;
using System.Web.Http;
using Logotrainer.Model.Interfaces;
using Microsoft.AspNet.Identity.Owin;

namespace Logotrainer.Server.Controllers.Api
{
    public abstract class BaseRepositoryController : ApiController
    {
        private IRepositoryFactory repositoryFactory;

        public BaseRepositoryController()
        {
        }

        public BaseRepositoryController(IRepositoryFactory repositoryFactory)
        {
            this.repositoryFactory = repositoryFactory;
        }

        protected IRepositoryFactory RepositoryFactory
        {
            get { return repositoryFactory ?? HttpContext.Current.GetOwinContext().Get<IRepositoryFactory>(); }
            private set { repositoryFactory = value; }
        }
    }
}