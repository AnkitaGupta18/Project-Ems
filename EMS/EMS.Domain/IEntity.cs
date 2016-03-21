using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMS.Domain {
    public interface IEntity<TKey> {
        TKey Id { get; set; }
    }

    public interface ITrackable {
        DateTime CreatedAt { get; set; }
        DateTime UpdatedAt { get; set; }
        DateTime? DeletedAt { get; set; }
    }

    public interface IUserTrackable {
        int CreatedById { get; set; }
        int UpdatedById { get; set; }
        int? DeletedById { get; set; }
    }
}
