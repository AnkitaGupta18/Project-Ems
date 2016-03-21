using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMS.Domain {
    public class Event : BaseEntity {
        public string Name { get; set; }
        public DateTime RequestDate { get; set; }
        public EventType EventType { get; set; }
        public bool Status { get; set; }

        [ForeignKey("ProjectInformation")]
        public int ProjectId { get; set; }
        public virtual ProjectInformation ProjectInformation { get; set; }

        [ForeignKey("VisitorInformation")]
        public int VisitorId { get; set; }
        public virtual VisitorInformation VisitorInformation { get; set; }
    }
}
