using System;

namespace Logotrainer.Model.Operation
{
    public class Level
    {
        public Guid LevelId { get; set; }
        public string LevelText { get; set; }
        public int LevelNumber { get; set; }
        public Guid SkillId { get; set; }
    }
}