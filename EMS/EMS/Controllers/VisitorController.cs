﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EMS.Controllers {
    public class VisitorController: Controller {
        public ActionResult Index() {
            return View();
        }

        public ActionResult Add() {
            return View();
        }
    }
}