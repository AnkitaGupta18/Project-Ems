using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMS.Domain {
   public class BaseEntity:IEntity<int>,ITrackable,IUserTrackable {
       public int Id { get; set; }
       public DateTime CreatedAt { get; set; }
       public DateTime UpdatedAt { get; set; }
       public DateTime? DeletedAt { get; set; }
       public int CreatedById { get; set; }
       public int UpdatedById { get; set; }
       public int? DeletedById { get; set; }
   }
}
