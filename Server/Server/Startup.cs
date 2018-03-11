using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Logotrainer.Server.Startup))]

namespace Logotrainer.Server
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            RepositoryFactoryConfig.Register(app);
            ConfigureAuth(app);
        }
    }
}