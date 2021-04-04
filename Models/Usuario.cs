
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Challenge.Models
{
    public class Usuario
    {
        public int Id { get; set; }


        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Descripcion{ get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public virtual Cliente Cliente { get; set; }

        [Required]
        public virtual List<PermisoOtorgado> Permisos {get;set;}

    }
}
