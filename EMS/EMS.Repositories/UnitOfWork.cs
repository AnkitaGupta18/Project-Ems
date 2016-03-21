using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EMS.Domain;

namespace EMS.Repositories {
    public class UnitOfWork : IUnitOfWork {
        private readonly DbContext _context;

        public UnitOfWork(AppCtx context, IRepository<ApplicationUser> users,
            IRepository<Employee> employees,
            IRepository<Department> departments,
            IRepository<Event>events,
            IRepository<ProjectInformation>projectInformations,
            IRepository<VisitorInformation>visitorInformations ) {
            _context = context;
            Users = users;
            Employees = employees;
            Departments = departments;
            Events = events;
            ProjectInformations = projectInformations;
            VisitorInformations = visitorInformations;
            }

        public int Save() {
            return _context.SaveChanges();
        }

        public IRepository<ApplicationUser> Users { get; }
        public IRepository<Employee> Employees { get; }
        public IRepository<Department> Departments { get; }
        public IRepository<Event> Events { get; }
        public IRepository<ProjectInformation> ProjectInformations { get; }
        public IRepository<VisitorInformation> VisitorInformations { get; }
    }
}
