using System;

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
        IExerciseRepository CreateExerciseRepository();
    }
}