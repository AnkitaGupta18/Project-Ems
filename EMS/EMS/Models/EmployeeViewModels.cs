using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EMS.Domain;

namespace EMS.Models {
    public class EmployeeViewModels {
        public EmployeeViewModels() {
            ProjectList = new Dictionary<int, string>();
        }
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public EmployeeType EmployeeType { get; set; }
        public int ProjectId { get; set; }
        public IDictionary<int, string> ProjectList { get; set; }

    }
}