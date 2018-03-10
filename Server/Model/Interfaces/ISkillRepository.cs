using Logotrainer.Model.Operation;

namespace Logotrainer.Model.Interfaces
{
    public interface ISkillRepository
    {
        void Add(Skill skill);
        void Update(Skill skill);
        bool Remove(Skill skill);
    }
}