using Challenge.DataAccess;
using Challenge.Models;
using Challenge.Session;
using Challenge.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Challenge.Controllers
{
    public class UsuarioController : Controller
    {

        private readonly Context _context;

        public UsuarioController(Context context) {
            _context = context;
        }

        public ActionResult Menu()
        {
            if (HttpContext.Session.GetObject<Usuario>("Usuario") != null)
            {
                return View();
            }
            else
            {

                return RedirectToAction("Index", "Home");
            }
        }


        public ActionResult ABMusuario() {

            Usuario user = HttpContext.Session.GetObject<Usuario>("Usuario");

            if (user != null)
            {


                ABMUsuarioViewModel vm = new ABMUsuarioViewModel();

                if (_context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.ListadoDeUsuarios.ToString()).FirstOrDefault() != null)
                {
                    vm.Usuarios = _context.Usuarios.ToList();
                    vm.Permisos = _context.Permisos.ToList();
                    vm.Clientes = _context.Clientes.ToList();
                    return View(vm);
                }
                else {
                    return RedirectToAction("Menu");
                }


                
            }
            else
            {

                return RedirectToAction("Index", "Home");
            }

        }


        [HttpPost]
        public IActionResult Alta(Usuario usuario,List<string> Permisos,int ClienteId) {

            Usuario usu = HttpContext.Session.GetObject<Usuario>("Usuario");
            if (usu != null)
            {
                if (_context.PermisoOtorgados
                    .Where(p => (p.Usuario.Id == usu.Id)
                    && p.Permiso.Name == Permiso.Permisos.AltaUsuario.ToString()).FirstOrDefault() != null)
                {

                    try
                    {
                        // agregar usuario
                        Usuario existe = _context.Usuarios.Where(u => u.UserName == usuario.UserName && u.Email == usuario.Email).SingleOrDefault();

                        if (existe == null)
                        {
                            
                            Cliente cli = _context.Clientes.Where(c => c.id == ClienteId).SingleOrDefault();

                            usuario.Cliente = cli;

                            _context.Usuarios.Add(usuario);
                            _context.SaveChanges();

                            List<PermisoOtorgado> permisoOtorgados = new List<PermisoOtorgado>();

                            foreach (string permiso in Permisos)
                            {

                                Permiso perContext = _context.Permisos.Where(p => p.Name == permiso).FirstOrDefault();
                                PermisoOtorgado permisoOt = new PermisoOtorgado
                                {
                                    Usuario = usuario,
                                    Permiso = perContext,
                                };

                                _context.PermisoOtorgados.Add(permisoOt);
                                _context.SaveChanges();

                            }
                            return Json(new { mensaje = "Alta Exitosa" });
                        }
                        return Json(new { mensaje = "Existe Usuario con estos datos" });

                    }
                    catch
                    {
                        return Json(new { mensaje = "No se pudo dar de alta" });
                    }


                }
                else
                {
                    return Json(new { mensaje = "No tienes permiso para dar de Alta" });
                }



            }
            else
            {

                return RedirectToAction("Index", "Home");
            }

        }





        [HttpPost]
        public IActionResult Modificacion(Usuario usuario, List<string> Permisos, int ClienteId)
        {

            Usuario usu = HttpContext.Session.GetObject<Usuario>("Usuario");
            if (usu != null)
            {
                if (_context.PermisoOtorgados
                    .Where(p => (p.Usuario.Id == usu.Id)
                    && p.Permiso.Name == Permiso.Permisos.ModificacionUsuario.ToString()).FirstOrDefault() != null)
                {

                    try
                    {
                        // agregar usuario
                      


                            Cliente cli = _context.Clientes.Where(c => c.id == ClienteId).SingleOrDefault();

                            usuario.Cliente = cli;

                        _context.Usuarios.Attach(usuario);
                        _context.Entry(usuario).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        _context.SaveChanges();


                        // elimino permisos anteriores para actualizar los nuevos 
                        EliminarPermisos(usuario);
                        List<PermisoOtorgado> permisoOtorgados = new List<PermisoOtorgado>();

                            foreach (string permiso in Permisos)
                            {

                                Permiso perContext = _context.Permisos.Where(p => p.Name == permiso).FirstOrDefault();
                                PermisoOtorgado permisoOt = new PermisoOtorgado
                                {
                                    Usuario = usuario,
                                    Permiso = perContext,
                                };

                                _context.PermisoOtorgados.Add(permisoOt);
                                _context.SaveChanges();

                            }
                            return Json(new { mensaje = "Modificacion Exitosa" });
           

                    }
                    catch
                    {
                        return Json(new { mensaje = "No se pudo Modificar" });
                    }


                }
                else
                {
                    return Json(new { mensaje = "No tienes permiso para Modificar" });
                }



            }
            else
            {

                return RedirectToAction("Index", "Home");
            }

        }



        private void EliminarPermisos(Usuario usuario) {

            List<PermisoOtorgado> permisos = _context.PermisoOtorgados.Where(p => p.Usuario.Id == usuario.Id).ToList();

            if (permisos != null) {
                foreach (PermisoOtorgado permiso in permisos) {

                    _context.PermisoOtorgados.Remove(permiso);
                    _context.SaveChanges();
                }
             

            }

        }






        [HttpGet]
        public IActionResult GetUsuario(int id, bool eliminar)
        {

            Usuario user = HttpContext.Session.GetObject<Usuario>("Usuario");

            if (user != null)
            {
                Usuario usuario;
                PermisoOtorgado permiso;

                if (eliminar == true)
                {
                    permiso = _context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.BajaUsuario.ToString()).SingleOrDefault();

                }
                else
                {
                    permiso = _context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.ModificacionUsuario.ToString()).SingleOrDefault();

                }


                if (permiso != null)
                {



   
                    usuario = _context.Usuarios.Include(c=> c.Cliente ).Where(c => c.Id == id).SingleOrDefault();


                  

                    if (usuario != null)
                    {
                        UsuarioViewModel vm = new UsuarioViewModel(usuario);
                        List<Permiso> pp = _context.Permisos.ToList();
                        List<PermisoOtorgado> permisos = _context.PermisoOtorgados.Where(c => c.Usuario.Id == usuario.Id).ToList();
                        foreach (PermisoOtorgado per in permisos) {

                            vm.PermisosString.Add(per.Permiso.Name);
                        }

                        return Json(vm);

                    }
                }
                else
                {
                    return null;
                };



            }
            return PartialView("Index", "Home");
        }




        [HttpGet]
        public IActionResult EliminarUsuario(int id)
        {


            Usuario user = HttpContext.Session.GetObject<Usuario>("Usuario");

            if (user != null)
            {




                if (_context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.BajaUsuario.ToString()).FirstOrDefault() != null)
                {

                    Usuario usu = _context.Usuarios.Where(c => c.Id == id).SingleOrDefault();

                    if (usu != null)
                    {

                        EliminarPermisos(usu);
                        _context.Usuarios.Remove(usu);
                        _context.SaveChanges();
                        return Json(new { mensaje = "Se Elimino Correctamente" });
                    }
                    else
                    {
                        return Json(new { mensaje = "No se puedo eliminar " });
                    }

                }
                return Json(new { mensaje = "No tienes permiso para Eliminar" });


            }
            else
            {

                return RedirectToAction("Index", "Home");
            }

        }


    }
}
