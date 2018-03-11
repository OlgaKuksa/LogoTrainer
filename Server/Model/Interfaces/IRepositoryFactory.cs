using System;

namespace Logotrainer.Model.Interfaces
{
    public interface IRepositoryFactory: IDisposable
    {
        ISkillGroupRepository CreateSkillGroupRepository();

        ISkillRepository CreateSkillRepository();

        IUserRepository CreateUserRepository();
    }

    public interface IUserRepository
    {
    }
}