using System;
using System.Collections.Generic;
using Logotrainer.Model.Operation;

namespace Logotrainer.Model.Interfaces
{
    public interface IGroupRepository
    {
        IList<Group> FindGroupsByLogoUserId(Guid userId);
    }
}