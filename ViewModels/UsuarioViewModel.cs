using Challenge.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge.ViewModels
{
    public class UsuarioViewModel
    {



        public int Id { get; set; }

        public string Nombre { get; set; }

        public string NombreUsuario { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string Descripcion { get; set; }
 
        public List<string> PermisosString  { get; set; }

        public int ClienteId { get; set; }




        public Usuario ToEntity() {
            Usuario usu = new Usuario
            {
                Nombre = Nombre,
                Email = Email,
                Descripcion = Descripcion,
                Password = Password,
                UserName = NombreUsuario,
               

            };

            return usu;
        }

        public UsuarioViewModel(Usuario u) {


            this.Nombre = u.Nombre;
            this.Email = u.Email;
            this.Descripcion = u.Descripcion;
            this.Id = u.Id;
            this.NombreUsuario = u.UserName;
            this.Password = u.Password;
            if(u.Cliente != null)
            {
                this.ClienteId = u.Cliente.id;
            }

            this.PermisosString = new List<string>(); 

        }

    }
}
