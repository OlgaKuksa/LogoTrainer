using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Logotrainer.Model.Interfaces;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

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
            get { return repositoryFactory ??  HttpContext.Current.GetOwinContext().Get<IRepositoryFactory>(); }
            private set { repositoryFactory = value; }
        }

        //public ActionResult SmartJson(object value)
        //{
        //    return Content(JsonConvert.SerializeObject(value,
        //        new JsonSerializerSettings {ContractResolver = new CamelCasePropertyNamesContractResolver()}));
        //}
        
    }
}