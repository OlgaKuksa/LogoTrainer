using System.Data;

namespace Logotrainer.Persistence.Repositories
{
    public abstract class BaseRepository
    {
        public BaseRepository(IDbConnection connection)
        {
            Connection = connection;
        }

        protected IDbConnection Connection { get; private set; }
    }
}