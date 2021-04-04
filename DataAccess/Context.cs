using Challenge.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Challenge.ViewModels;



namespace Challenge.DataAccess
{
    public class Context : DbContext
    {

   

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder) {
        //    optionBuilder.UseSqlServer(@"Server=.\SQLEXPRESS; initial catalog=Challenge ; trusted_Connection = true;");
        //}


        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<Cliente> Clientes { get; set; }      
        public virtual DbSet<Permiso> Permisos { get; set; }
        public virtual DbSet<PermisoOtorgado> PermisoOtorgados { get; set; }
      


    }
}
