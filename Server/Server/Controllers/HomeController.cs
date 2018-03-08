using System.Web.Mvc;

namespace Server.Controllers
{
    [Authorize] public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}