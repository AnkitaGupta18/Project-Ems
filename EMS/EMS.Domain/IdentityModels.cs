using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace EMS.Domain
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser<int,UserLoginIntPk,UserRoleIntPk,UserClaimIntPk>,IEntity<int>,ITrackable,IUserTrackable
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser,int> manager)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }

        //Inherited Fields
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public int CreatedById { get; set; }
        public int UpdatedById { get; set; }
        public int? DeletedById { get; set; }
        //Extra Fields
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [NotMapped]
        public string FullName => $"{FirstName} {LastName}";

    }
    public class UserRoleIntPk : IdentityUserRole<int> { }

    public class UserClaimIntPk : IdentityUserClaim<int> { }

    public class UserLoginIntPk : IdentityUserLogin<int> { }

    public class RoleIntPk : IdentityRole<int, UserRoleIntPk> {
        public RoleIntPk() { }

        public RoleIntPk(string name) {
            Name = name;
        }
    }

    public class UserStoreIntPk : UserStore<ApplicationUser, RoleIntPk, int,
        UserLoginIntPk, UserRoleIntPk, UserClaimIntPk> {
        public UserStoreIntPk(AppCtx context)
            : base(context) { }
    }

    public class RoleStoreIntPk : RoleStore<RoleIntPk, int, UserRoleIntPk> {
        public RoleStoreIntPk(AppCtx context)
            : base(context) { }
    }
    //public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    //{
    //    public ApplicationDbContext()
    //        : base("DefaultConnection", throwIfV1Schema: false)
    //    {
    //    }

    //    public static ApplicationDbContext Create()
    //    {
    //        return new ApplicationDbContext();
    //    }
    //}
}