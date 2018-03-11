using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Logotrainer.Model.Operation;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Logotrainer.Server.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit https://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string Hometown { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }

        public User ToUser()
        {
            return new User(){UserId = new Guid(Id),LoginId = UserName,Password = PasswordHash};
        }

        public static ApplicationUser FromUser(User user)
        {
            if (user == null) return null;
            return new ApplicationUser(){Id=user.UserId.ToString(),UserName = user.LoginId,PasswordHash = user.Password};
        }
    }

   

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}