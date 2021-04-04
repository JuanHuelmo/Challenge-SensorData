using Microsoft.EntityFrameworkCore.Migrations;

namespace Challenge.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    Clienteid = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Permisos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permisos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Permisos_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RazonSocial = table.Column<string>(nullable: false),
                    NroRut = table.Column<int>(nullable: false),
                    Direccion = table.Column<string>(nullable: false),
                    Pais = table.Column<string>(nullable: false),
                    Ciudad = table.Column<string>(nullable: false),
                    CodigoPostal = table.Column<int>(nullable: false),
                    Zona = table.Column<int>(nullable: false),
                    Telefono = table.Column<string>(nullable: false),
                    Fax = table.Column<string>(nullable: false),
                    Email = table.Column<string>(nullable: false),
                    Web = table.Column<string>(nullable: true),
                    SeguroTransitos = table.Column<int>(nullable: false),
                    SeguroTransitoCargaSuelta = table.Column<int>(nullable: false),
                    Activo = table.Column<bool>(nullable: false),
                    PermisoId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.id);
                    table.ForeignKey(
                        name: "FK_Clientes_Permisos_PermisoId",
                        column: x => x.PermisoId,
                        principalTable: "Permisos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_PermisoId",
                table: "Clientes",
                column: "PermisoId");

            migrationBuilder.CreateIndex(
                name: "IX_Permisos_UsuarioId",
                table: "Permisos",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_Clienteid",
                table: "Usuarios",
                column: "Clienteid");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_Clientes_Clienteid",
                table: "Usuarios",
                column: "Clienteid",
                principalTable: "Clientes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clientes_Permisos_PermisoId",
                table: "Clientes");

            migrationBuilder.DropTable(
                name: "Permisos");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Clientes");
        }
    }
}
