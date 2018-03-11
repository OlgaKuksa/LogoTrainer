using System;

namespace Logotrainer.Model.Operation
{
    public class Kid
    {
        public Guid KidId { get; set; }
        public Guid GroupId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool IsArchived { get; set; }
    }
}