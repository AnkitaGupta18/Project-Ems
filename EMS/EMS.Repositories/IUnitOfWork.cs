using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMS.Domain;

namespace EMS.Repositories {
   public interface IUnitOfWork {
        int Save();
        IRepository<ApplicationUser> Users { get; }
        IRepository<Employee> Employees { get; }
        IRepository<Department> Departments { get; }
        IRepository<Event> Events { get; }
        IRepository<ProjectInformation> ProjectInformations { get; }
        IRepository<VisitorInformation> VisitorInformations { get; }     
    }
}
