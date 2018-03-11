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

    public class User
    {
        public Guid UserId { get; set; }
        public string LoginId { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
    }
}