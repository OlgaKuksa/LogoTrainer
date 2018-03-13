using System;
using System.Collections.Generic;

namespace Logotrainer.Server.Controllers.Api
{
    public class GenerateKidSetParameter
    {
        public Guid KidId { get; set; }
        public IList<Guid> SkillIds { get; set; }
    }
}