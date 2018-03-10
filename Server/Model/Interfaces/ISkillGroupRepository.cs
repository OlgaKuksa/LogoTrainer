using System.Collections.Generic;
using Logotrainer.Model.Operation;

namespace Logotrainer.Model.Interfaces
{
    public interface ISkillGroupRepository
    {
        IList<SkillGroup> GetAll();
        void Add(SkillGroup skillGroup);
        void Update(SkillGroup skillGroup);
        void Remove(SkillGroup skillGroup);
    }
}