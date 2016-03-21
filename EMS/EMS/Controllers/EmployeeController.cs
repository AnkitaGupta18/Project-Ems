using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EMS.Models;

namespace EMS.Controllers {
    public class EmployeeController : Controller {
        // GET: Employee
        public ActionResult Index() {
            return View();
        }

        public ActionResult Add() {
            return View();
        }

        [HttpPost]
        public ActionResult Add(EmployeeViewModels model) {

            return View();
        }
    }
}