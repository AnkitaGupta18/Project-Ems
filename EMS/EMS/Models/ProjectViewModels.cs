﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EMS.Models {
    public class ProjectViewModels {
        public ProjectViewModels() {
            EmployeeList = new Dictionary<int, string>();
        }
        public int? Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public IDictionary<int, string> EmployeeList { get; set; }

    }
}