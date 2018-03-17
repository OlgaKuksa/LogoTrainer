using System;

namespace Logotrainer.Server.Controllers.Api
{
    public class SkillRemoveResult
    {
        public bool FailedToRemove { get; set; }
        public Guid SkillId { get; set; }
        public Guid SkillGroupId { get; set; }
    }
}