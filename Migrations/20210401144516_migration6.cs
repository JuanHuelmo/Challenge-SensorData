using Microsoft.EntityFrameworkCore.Migrations;

namespace Challenge.Migrations
{
    public partial class migration6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PermisoOtorgados_Clientes_Clienteid",
                table: "PermisoOtorgados");

            migrationBuilder.DropIndex(
                name: "IX_PermisoOtorgados_Clienteid",
                table: "PermisoOtorgados");

            migrationBuilder.DropColumn(
                name: "Clienteid",
                table: "PermisoOtorgados");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Clienteid",
                table: "PermisoOtorgados",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PermisoOtorgados_Clienteid",
                table: "PermisoOtorgados",
                column: "Clienteid");

            migrationBuilder.AddForeignKey(
                name: "FK_PermisoOtorgados_Clientes_Clienteid",
                table: "PermisoOtorgados",
                column: "Clienteid",
                principalTable: "Clientes",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
