using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMS.Domain {
    public class Employee : BaseEntity {
        public string Name { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public EmployeeType EmployeeType { get; set; }
        [ForeignKey("ProjectInformation")]
        public int ProjectId { get; set; }
        public virtual ProjectInformation ProjectInformation { get; set; }

    }
}
