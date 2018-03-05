using System;
using System.Collections;
using System.Collections.Generic;

namespace Logotrainer.Model.Operation
{
    public class SkillGroup
    {
        public Guid SkillGroupId { get; set; }
        public string SkillGroupName { get; set; }
        public IList<Skill> Skills { get; set; }
    }
}