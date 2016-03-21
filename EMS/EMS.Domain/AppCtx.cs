using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
namespace EMS.Domain {
   public class AppCtx : IdentityDbContext<ApplicationUser,RoleIntPk,int,UserLoginIntPk,UserRoleIntPk,UserClaimIntPk> {
       public AppCtx() : base("AppCtx") { }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<ProjectInformation> ProjectInformations { get; set; }
        public DbSet<VisitorInformation> VisitorInformations { get; set; } 
        public static AppCtx Create() {
            return new AppCtx();
        }


        public override int SaveChanges() {
            var changeSet = ChangeTracker.Entries<ITrackable>();

            if (changeSet != null) {
                foreach (var entry in changeSet.Where(c => c.State != EntityState.Unchanged)) {
                    if (entry.State == EntityState.Added) {
                        entry.Entity.CreatedAt = DateTime.UtcNow;
                    } else if (entry.State == EntityState.Deleted) {
                        entry.Entity.DeletedAt = DateTime.UtcNow;
                        entry.State = EntityState.Modified;
                    }
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChanges();
        }
    }
}
