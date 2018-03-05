using System.Data.Entity;
using Logotrainer.Model.Interfaces;
using Logotrainer.Persistence.Repositories;
using Owin;

namespace Server
{
    public static class RepositoryFactoryConfig
    {
        public static void Register(IAppBuilder app)
        {
            app.CreatePerOwinContext(Create);
        }

        private const string connectionString = "DefaultConnection";

        public static IRepositoryFactory Create()
        {
            return new RepositoryFactory(()=>new DbContext(connectionString).Database.Connection);
        }
    }
}