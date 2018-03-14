using System;
using System.Collections.Generic;
using System.Data;
using Logotrainer.Model.Interfaces;
using Logotrainer.Model.Operation;

namespace Logotrainer.Persistence.Repositories
{
    public class KidRepository : BaseRepository, IKidRepository
    {
        public KidRepository(IDbConnection connection):base(connection)
        {
            
        }

        public IList<Kid> GetByLogoUserId(Guid userId)
        {
            throw new NotImplementedException();
        }

        public void Add(Kid kid)
        {
            throw new NotImplementedException();
        }

        public void Update(Kid kid)
        {
            throw new NotImplementedException();
        }
    }
}