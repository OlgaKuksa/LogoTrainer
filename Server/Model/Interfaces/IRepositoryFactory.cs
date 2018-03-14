using System;
using System.Collections.Generic;
using Logotrainer.Model.Operation;

namespace Logotrainer.Model.Interfaces
{
    public interface IRepositoryFactory: IDisposable
    {
        ISkillGroupRepository CreateSkillGroupRepository();

        ISkillRepository CreateSkillRepository();

        IUserRepository CreateUserRepository();
        IKidRepository CreateKidRepository();
        IGroupRepository CreateGroupRepository();
        IKidSetRepository CreateKidSetRepository();
    }

    public interface IGroupRepository
    {
        IList<Group> FindGroupsByLogoUserId(Guid userId);
    }
}