using System.Web.Mvc;
using System.Web.Routing;

namespace Server
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "DefaultApi",
                url: "api/{controller}/{action}/{id}",
                defaults: new { id = UrlParameter.Optional, action = "Index" },
                namespaces: new[] { "Server.Controllers.Api, Server" }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new {controller = "Home", action = "Index", id = UrlParameter.Optional}
            );
            
        }
    }
}