using Challenge.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge.ViewModels
{
    public class ABMUsuarioViewModel
    {
        public List<Usuario> Usuarios { get; set; }

        public List<Permiso> Permisos { get; set; }

        public List<Cliente> Clientes {get; set;}
    }
}
