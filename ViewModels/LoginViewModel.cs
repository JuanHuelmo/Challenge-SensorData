using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge.ViewModels
{

    public class LoginViewModel
    {
        [Required(ErrorMessage = "Este campo es obligatorio.")]
        [Display(Name = "Nombre usuario o Email")]
        public string EmailUserName{ get; set; }


        [Required(ErrorMessage = "Ingrese una contraseña")]
        public string Password { get; set; }


        public string Mensaje { get; set; }

    }
}
