using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EMS.Repositories {
    public interface IRepository<T> where T : class {
        //RETRIEVE METHODS
        IQueryable<T> Get(Expression<Func<T, bool>> filter, params Expression<Func<T, object>>[] includeProperties);
        IQueryable<T> Get(params Expression<Func<T, object>>[] includeProperties);

        //MODIFICATION METHODS
        void Add(T entity);
        void Delete(T entityToDelete);
        void Update(T entityToUpdate);

        //SAVE 
        int Save();

        Task<T> AddAsync(T entity);
        Task<bool> DeleteAsync(T entity);
        Task<IQueryable<T>> GetAsync(Expression<Func<T, bool>> filter = null);
    }
}
