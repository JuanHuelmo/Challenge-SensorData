
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Challenge.Models
{
    public class Cliente
    {
        public int id { get; set; }

        [Required]
        public string RazonSocial { get; set; }

        [Required]
        public int NroRut { get; set; }

        [Required]
        public string Direccion { get; set; }

        [Required]
        public string Pais { get; set; }

        [Required]
        public string Ciudad { get; set; }

        [Required]
        public int CodigoPostal {get;set;}


        [Required]
        public Zonas Zona { get; set; }

        [Required]
        public string Telefono { get; set; }

        [Required]
        public string Fax { get; set; }

        [Required]
        public string Email { get; set; }

        public string Web { get; set; }



        [Required]
        public SegurosTransitos SeguroTransitos { get; set; }

        [Required]
        public SegurosTransitosCargaSuelta SeguroTransitoCargaSuelta { get; set; }


        [Required]
        public bool Activo { get; set; }

         
        public enum SegurosTransitos { 
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


        public enum Zonas
        {
            Norte = 1,
            Centro = 2,
            Sur = 3,
        };

    }
}
