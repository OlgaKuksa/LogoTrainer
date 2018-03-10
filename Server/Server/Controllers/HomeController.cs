using System.Web.Mvc;

namespace Logotrainer.Server.Controllers
{
    [Authorize] public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return File("~/index.html","text/html");
        }
    }
}