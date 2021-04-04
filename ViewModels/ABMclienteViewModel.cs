using Challenge.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge.ViewModels
{
    public class ABMclienteViewModel
    {


       public List<Cliente> Clientes { get; set; }



        /// Clientes
        public int id { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public string RazonSocial { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public int NroRut { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public string Direccion { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public string Pais { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public string Ciudad { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public int CodigoPostal { get; set; }



        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public string Telefono { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public string Fax { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public string Email { get; set; }

        public string Web { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public SegurosTransitos SeguroTransitos { get; set; }

        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public SegurosTransitosCargaSuelta SeguroTransitoCargaSuelta { get; set; }


        [Required(ErrorMessage = "Este campo es obligatorio.")]
        public bool Activo { get; set; }

        public enum SegurosTransitos
        {
            Si = 1,
            No = 2,
            Opcional = 3,

        };

        public enum SegurosTransitosCargaSuelta
        {
            Si = 1,
            No = 2,
            Opcional = 3,

        };

        public Zonas Zona { get; set; }

        public enum Zonas
        {
            Norte = 1,
            Centro = 2,
            Sur = 3,
        };



        public ABMclienteViewModel()
        {

        }






    }
}
