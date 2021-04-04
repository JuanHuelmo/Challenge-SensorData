using Challenge.DataAccess;
using Challenge.Models;
using Challenge.Session;
using Challenge.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge.Controllers
{
    public class HomeController : Controller
    {
        
        private readonly Context _context;
        public HomeController(Context context)
        {
           
           
            _context = context;
        }

        public ActionResult Index()
        {
            if (HttpContext.Session.GetObject<Usuario>("Usuario") == null) {

                LoginViewModel vm = new LoginViewModel();

                return View(vm);
            }
            else
            {
                
                return RedirectToAction("Menu","Usuario");
            }

           
        }


        [HttpPost]
        public IActionResult Login(LoginViewModel vm)
        {

            if (ModelState.IsValid)
            {
                Usuario usu = _context.Usuarios.Where(usuario => (usuario.UserName == vm.EmailUserName || usuario.Email == vm.EmailUserName) && usuario.Password == vm.Password).SingleOrDefault();
                if (usu != null)
                {

                
                    HttpContext.Session.SetObject("Usuario", usu);
                    HttpContext.Session.SetInt32("IdUsuario", usu.Id);
                    // redirigir a menu Usuario
                     return Json(new
                    {
                        newUrl = Url.Action("Menu", "Usuario") 
                    }
            );
                }
                else
                {
                    return null;
                }

            }
            else {

                return RedirectToAction("Index");
            }

          

           
        }



        public IActionResult Mapa()
        {
            Usuario user = HttpContext.Session.GetObject<Usuario>("Usuario");

            if (user != null)
            {

                if (_context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.ListadoDeClientes.ToString()).FirstOrDefault() != null)
                {
                    return View();
                }
            }
            return RedirectToAction("Index");
        }


        public IActionResult LogOut()
        {

            if (HttpContext.Session.GetObject<Usuario>("Usuario") != null)
            {

                HttpContext.Session.SetObject("Usuario", null);
                HttpContext.Session.SetInt32("IdUsuario", 0);
            }

            return RedirectToAction("Index");
        }








    }
}
