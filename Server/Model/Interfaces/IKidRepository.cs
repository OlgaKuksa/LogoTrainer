using System;
using System.Collections.Generic;
using Logotrainer.Model.Operation;

namespace Logotrainer.Model.Interfaces
{
    public interface IKidRepository
    {
        IList<Kid> GetByLogoUserId(Guid userId);
        void Add(Kid kid);
        void Update(Kid kid);
    }

    public interface IKidProfileRepository
    {
        void Add(KidProfile kidProfile);
        IList<KidProfile> FindByKidId(Guid kidId);
    }
}