using System;
using System.Collections.Generic;

namespace Logotrainer.Model.Operation
{
    public class Skill
    {
        public Guid SkillId { get; set; }
        public Guid SkillGroupId { get; set; }

        public string SkillName { get; set; }
        public string SkillQuestion { get; set; }
        public IList<Level> SkillLevels { get; set; }
    }
}