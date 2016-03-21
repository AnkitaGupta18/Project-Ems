using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using EMS.Domain;

namespace EMS.Repositories {
    public class SqlRepository<T> : IRepository<T> where T : class {
        protected readonly DbContext Context;
        protected readonly IDbSet<T> DbSet;

        public SqlRepository(AppCtx ctx) {
            Context = ctx;
            DbSet = ctx.Set<T>();
        }
        public IQueryable<T> Get(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] includeProperties) {
            foreach (var property in includeProperties) {
                DbSet.Include(property).Load();
            }

            return DbSet.Where(filter);
        }

        public IQueryable<T> Get(params Expression<Func<T, object>>[] includeProperties) {
            foreach (var property in includeProperties) {
                DbSet.Include(property);
            }

            return DbSet;
        }

        public void Add(T entity) {
            DbSet.Add(entity);
        }

        public void Delete(T entityToDelete) {
            if (Context.Entry(entityToDelete).State == EntityState.Detached) {
                DbSet.Attach(entityToDelete);
            }

            DbSet.Remove(entityToDelete);
        }

        public void Update(T entityToUpdate) {
            DbSet.AddOrUpdate(entityToUpdate);
        }

        public int Save() {
            return Context.SaveChanges();
        }

        public Task<T> AddAsync(T entity) {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(T entity) {
            throw new NotImplementedException();
        }

        public Task<IQueryable<T>> GetAsync(Expression<Func<T, bool>> filter = null) {
            throw new NotImplementedException();
        }
    }
}
