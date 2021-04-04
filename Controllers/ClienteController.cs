using Challenge.DataAccess;
using Challenge.Models;
using Challenge.Session;
using Challenge.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Challenge.Controllers
{
    public class ClienteController : Controller
    {
        private readonly Context _context;


        public ClienteController(Context context) {

            _context = context;
        }


        public ActionResult ABMclientes()
        {

            Usuario user = HttpContext.Session.GetObject<Usuario>("Usuario");

            if (user != null)
            {


                ABMclienteViewModel vm = new ABMclienteViewModel();
                

                if (_context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.ListadoDeClientes.ToString()).FirstOrDefault() != null)
                {
                    // cambiar a listado de clientes
                    vm.Clientes = _context.Clientes.ToList();
                    return View(vm);
                }

                return RedirectToAction("Index", "Home");
            }
            else
            {

                return RedirectToAction("Index", "Home");
            }

        }




        [HttpGet]
        public IActionResult GetCliente(int id,bool eliminar)
        {

            Usuario user = HttpContext.Session.GetObject<Usuario>("Usuario");

            if (user != null)
            {
                Cliente cliente;
                PermisoOtorgado permiso;

                if (eliminar == true) {
                    permiso = _context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.BajaCliente.ToString()).SingleOrDefault();

                }
                else
                {
                    permiso = _context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.ModificacionCliente.ToString()).SingleOrDefault();

                }


                if (permiso != null)
                {


                    
                    cliente = _context.Clientes.Where(c => c.id == id).SingleOrDefault();


                    ClienteViewModel vm = new ClienteViewModel(cliente);

                    if (cliente != null)
                    {

                        return Json(vm);

                    }
                } else {
                    return null;
                };



            }
            return PartialView("Index", "Home");
        }



        [HttpPost]
        public IActionResult ModificacionCliente(Cliente cliente) {


            Usuario user = HttpContext.Session.GetObject<Usuario>("Usuario");

            if (user != null)
            {
                if (_context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.ModificacionCliente.ToString()).SingleOrDefault() != null)
                {

                    Cliente cli = cliente;
                    try
                    {
                        _context.Clientes.Attach(cli);
                        _context.Entry(cli).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                        _context.SaveChanges();

                        return Json(cli);
                    }
                    catch {
                        return null;
                    }
                  


                }

                }
                return PartialView("Index", "Home");

        }





        [HttpPost]
        public IActionResult AltaCliente(Cliente cliente)
        {


            Usuario user = HttpContext.Session.GetObject<Usuario>("Usuario");

            if (user != null)
            {
                if (_context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.AltaCliente.ToString()).SingleOrDefault() != null)
                {

                    Cliente cli = cliente;
                    try
                    {
                       Cliente cliExistente =  _context.Clientes.Where(c => c.RazonSocial == cliente.RazonSocial && cliente.NroRut == cliente.NroRut).FirstOrDefault();

                        if (cliExistente == null)
                        {

                            _context.Clientes.Add(cliente);
                            _context.SaveChanges();
                            return Json(new { mensaje = "Alta Exitosa" });
                        }
                        else {
                            return Json(new { mensaje = "Existe un cliente con estos datos" });
                        }


                     
                    }
                    catch
                    {
                        return null;
                    }



                }
                else
                {
                    return Json(new { mensaje = "No tienes permiso para dar de Alta" });
                }

            }
            return PartialView("Index", "Home");

        }





        [HttpGet]
        public IActionResult EliminarCliente(int id) {


            Usuario user = HttpContext.Session.GetObject<Usuario>("Usuario");

            if (user != null)
            {


              

                if (_context.PermisoOtorgados.Where(p => p.Usuario.Id == user.Id && p.Permiso.Name == Permiso.Permisos.BajaCliente.ToString()).FirstOrDefault() != null)
                {

                    Cliente cli = _context.Clientes.Where(c => c.id == id).SingleOrDefault();

                    if (cli != null)
                    {
                        _context.Clientes.Remove(cli);
                        _context.SaveChanges();
                        return Json(new { mensaje = "Se Elimino Correctamente" });
                    }
                    else {
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
