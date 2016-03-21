using System;
using System.Web;
using System.Collections.Generic;
using System.Reflection;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Owin;
using SimpleInjector;
using SimpleInjector.Advanced;
using SimpleInjector.Integration.Web.Mvc;

using System.Web.Mvc;
using EMS.Domain;
using EMS.Repositories;


namespace EMS.DI {
    public static class SimpleInjectorInitializer {
        //Install-Package SimpleInjector
        public static Container InitializeWebApp(IAppBuilder app) {
            var container = new Container();
            //            container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();
            container.Options.AllowOverridingRegistrations = true;

            BuildWebAppDependencies(container, app);
            BuildCommonDependencies(container);

            container.Verify();

            DependencyResolver.SetResolver(
                new SimpleInjectorDependencyResolver(container));

            return container;
        }

        public static void BuildCommonDependencies(Container container) {
            //Registering Repositories
            container.Register(typeof(IRepository<ApplicationUser>), typeof(SqlRepository<ApplicationUser>));
            container.Register(typeof(IRepository<Employee>), typeof(SqlRepository<Employee>));
            container.Register(typeof(IRepository<Department>), typeof(SqlRepository<Department>));
            container.Register(typeof(IRepository<Event>), typeof(SqlRepository<Event>));
            container.Register(typeof(IRepository<ProjectInformation>), typeof(SqlRepository<ProjectInformation>));
            container.Register(typeof(IRepository<VisitorInformation>), typeof(SqlRepository<VisitorInformation>));

        }

        public static void BuildWebAppDependencies(Container container, IAppBuilder app) {

            container.RegisterPerWebRequest<AppCtx>();
            container.RegisterPerWebRequest<IAppBuilder>(() => app);

            //            container.RegisterSingleton<IAppBuilder>(app);

            container.RegisterPerWebRequest<IAuthenticationManager>(() => {
                IOwinContext context = null;
                try {
                    context = HttpContext.Current.GetOwinContext();

                } catch (InvalidOperationException) {
                    // Please note that the `IsVerifying()` method is 
                    // declared in SimpleInjector.Advanced. 
                    if (container.IsVerifying()) {
                        return new FakeAuthenticationManager();
                    }
                    throw;
                }

                return context.Authentication;
            });


            container.Register<IUnitOfWork, UnitOfWork>();

            //Register All Controllers
            container.RegisterMvcControllers(
                Assembly.GetExecutingAssembly());
        }

    }
    public class FakeAuthenticationManager : IAuthenticationManager {
        public AuthenticationResponseChallenge AuthenticationResponseChallenge { get; set; }
        public AuthenticationResponseGrant AuthenticationResponseGrant { get; set; }
        public AuthenticationResponseRevoke AuthenticationResponseRevoke { get; set; }
        public ClaimsPrincipal User { get; set; }

        public Task<IEnumerable<AuthenticateResult>> AuthenticateAsync(string[] authenticationTypes) {
            throw new NotImplementedException();
        }

        public Task<AuthenticateResult> AuthenticateAsync(string authenticationType) {
            throw new NotImplementedException();
        }

        public void Challenge(params string[] authenticationTypes) {
            throw new NotImplementedException();
        }

        public void Challenge(AuthenticationProperties properties, params string[] authenticationTypes) {
            throw new NotImplementedException();
        }

        public IEnumerable<AuthenticationDescription> GetAuthenticationTypes(
            Func<AuthenticationDescription, bool> predicate) {
            throw new NotImplementedException();
        }

        public IEnumerable<AuthenticationDescription> GetAuthenticationTypes() {
            throw new NotImplementedException();
        }

        public void SignIn(params System.Security.Claims.ClaimsIdentity[] identities) { }
        public void SignIn(AuthenticationProperties properties, params ClaimsIdentity[] identities) { }
        public void SignOut(params string[] authenticationTypes) { }
        public void SignOut(AuthenticationProperties properties, params string[] authenticationTypes) { }
    }
}
