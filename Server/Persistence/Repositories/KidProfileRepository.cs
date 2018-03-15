using System;
using System.Collections.Generic;
using System.Data;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class KidProfileRepository : BaseRepository, IKidProfileRepository
    {
        public KidProfileRepository(IDbConnection connection) : base(connection)
        {
        }

        public void Add(KidProfile kidProfile)
        {
            throw new NotImplementedException();
        }

        public IList<KidProfile> FindByKidId(Guid kidId)
        {
            throw new NotImplementedException();
        }
    }
}