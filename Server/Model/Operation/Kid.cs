using System;

namespace Logotrainer.Model.Operation
{
    public class Kid
    {
        public Guid KidId { get; set; }
        public Guid GroupId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string HomeAddress { get; set; }
        public string HomePhone { get; set; }
        public string ParentInfo { get; set; }
        public string ParentMobile { get; set; }
        public bool IsArchived { get; set; }
    }
}