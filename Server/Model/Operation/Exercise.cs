using System;
using System.Collections.Generic;

namespace Logotrainer.Model.Operation
{
    public class Exercise
    {
        public Guid ExerciseId { get; set; }
        public string ExerciseName { get; set; }
        public string ExerciseInventory { get; set; }
        public string ExerciseSteps { get; set; }
        public Guid ExerciseMainSkillId { get; set; }
        public Guid ExerciseMainLevelId { get; set; }
        public IList<Guid> ExerciseSecondarySkills { get; set; }
    }
}