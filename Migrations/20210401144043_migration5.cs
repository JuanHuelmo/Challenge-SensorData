using Microsoft.EntityFrameworkCore.Migrations;

namespace Challenge.Migrations
{
    public partial class migration5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clientes_Permisos_PermisoId",
                table: "Clientes");

            migrationBuilder.DropForeignKey(
                name: "FK_Permisos_Usuarios_UsuarioId",
                table: "Permisos");

            migrationBuilder.DropIndex(
                name: "IX_Permisos_UsuarioId",
                table: "Permisos");

            migrationBuilder.DropIndex(
                name: "IX_Clientes_PermisoId",
                table: "Clientes");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Permisos");

            migrationBuilder.DropColumn(
                name: "PermisoId",
                table: "Clientes");

            migrationBuilder.CreateTable(
                name: "PermisoOtorgados",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Clienteid = table.Column<int>(nullable: true),
                    PermisoId = table.Column<int>(nullable: true),
                    UsuarioId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermisoOtorgados", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PermisoOtorgados_Clientes_Clienteid",
                        column: x => x.Clienteid,
                        principalTable: "Clientes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PermisoOtorgados_Permisos_PermisoId",
                        column: x => x.PermisoId,
                        principalTable: "Permisos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PermisoOtorgados_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PermisoOtorgados_Clienteid",
                table: "PermisoOtorgados",
                column: "Clienteid");

            migrationBuilder.CreateIndex(
                name: "IX_PermisoOtorgados_PermisoId",
                table: "PermisoOtorgados",
                column: "PermisoId");

            migrationBuilder.CreateIndex(
                name: "IX_PermisoOtorgados_UsuarioId",
                table: "PermisoOtorgados",
                column: "UsuarioId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PermisoOtorgados");

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Permisos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PermisoId",
                table: "Clientes",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Permisos_UsuarioId",
                table: "Permisos",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_PermisoId",
                table: "Clientes",
                column: "PermisoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clientes_Permisos_PermisoId",
                table: "Clientes",
                column: "PermisoId",
                principalTable: "Permisos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Permisos_Usuarios_UsuarioId",
                table: "Permisos",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
