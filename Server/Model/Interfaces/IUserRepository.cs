using Logotrainer.Model.Operation;

namespace Logotrainer.Model.Interfaces
{
    public interface IUserRepository
    {
        void Add(User user);
        void Update(User user);
        User FindById(string userId);
        User FindByLoginId(string loginId);
    }
}