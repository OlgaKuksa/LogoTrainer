using System;
using System.Collections.Generic;

namespace Logotrainer.Model.Operation
{
    public class KidSet
    {
        public Guid KidSetId { get; set; }
        public Guid KidId { get; set; }
        public DateTime CreateDateTime { get; set; }
        public IList<Guid> ExerciseIdsInSet { get; set; }
    }
}