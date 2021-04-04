
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Challenge.Models
{
    public class Permiso
    {

        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }




        public enum Permisos
        {
            ListadoDeUsuarios = 1,
            AltaUsuario = 2,
            ModificacionUsuario = 3,
            BajaUsuario = 4,
            ListadoDeClientes = 5,
            AltaCliente = 6,
            ModificacionCliente = 7,
            BajaCliente = 8,
            VisualizacionMapa =9, 
        }

        public virtual List<PermisoOtorgado> PermisosOtorgados { get; set; }

    }
}
