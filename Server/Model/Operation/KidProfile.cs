using System;
using System.Collections.Generic;

namespace Logotrainer.Model.Operation
{
    public class KidProfile
    {
        public Guid KidProfileId { get; set; }
        public Guid KidId { get; set; }
        public DateTime CreateDateTime { get; set; }
        public IDictionary<Guid, Guid> TestResult { get; set; }
    }
}