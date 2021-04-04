using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge.Models
{
    public class PermisoOtorgado
    {

        public int Id { get; set; }
        public Usuario Usuario { get; set; }

        public Permiso Permiso { get; set; }


    }
}
