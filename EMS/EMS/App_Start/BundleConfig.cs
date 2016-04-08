using System.Web;
using System.Web.Optimization;

namespace EMS {
    public class BundleConfig {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
            bundles.Add(new ScriptBundle("~/Assets/bundles/js/theme")
                     .Include("~/Assets/theme/js/jquery.js")
                     .Include("~/Assets/theme/js/tether.min.js")
                     .Include("~/Assets/theme/js/bootstrap.js")
                     .Include("~/Assets/theme/js/underscore-min.js")
                     .Include("~/Assets/theme/js/routie.js")
                     .Include("~/Assets/theme/js/jquery.storageapi.min.js")
                     .Include("~/Assets/theme/js/pace.min.js")
                      .Include("~/Assets/theme/js/ui-include.js")
                     .Include("~/Assets/theme/js/app.js")
                     .Include("~/Assets/theme/js/config.js")
                     .Include("~/Assets/theme/js/config.lazyload.js")
                     .Include("~/Assets/theme/config.router.js")
                     .Include("~/Assets/theme/js/palette.js")
                     .Include("~/Assets/theme/js/ui-form.js")
                     .Include("~/Assets/theme/js/ui-jp.js")
                     .Include("~/Assets/theme/js/ui-load.js")
                     .Include("~/Assets/theme/js/ui-nav.js")
                     .Include("~/Assets/theme/js/ui-screenfull.js")
                     .Include("~/Assets/theme/js/ui-scroll-to.js")
                     .Include("~/Assets/theme/js/ui-toggle-class.js")
                     .Include("~/Assets/theme/js/prototype.forms.js")
                     .Include("~/Assets/theme/js/jotform.forms.js")
                     .Include("~/Assets/theme/js/postMessage.js")
                     .Include("~/Assets/theme/js/WidgetsServer.js"));

            bundles.Add(new StyleBundle("~/Assets/bundles/css/theme")
                .Include("~/Assets/theme/css/app.css")
                 .Include("~/Assets/theme/css/bootstrap.min.css")
                .Include("~/Assets/theme/css/animate.min.css")
                .Include("~/Assets/theme/css/font-awesome.min.css")
                .Include("~/Assets/theme/css/font.css")
                .Include("~/Assets/theme/css/material-design-icons.css"));
        }
    }
}
