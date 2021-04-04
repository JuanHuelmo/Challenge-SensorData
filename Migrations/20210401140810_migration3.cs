using Microsoft.EntityFrameworkCore.Migrations;

namespace Challenge.Migrations
{
    public partial class migration3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_Clientes_Clienteid",
                table: "Usuarios");

            migrationBuilder.AlterColumn<int>(
                name: "Clienteid",
                table: "Usuarios",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_Clientes_Clienteid",
                table: "Usuarios",
                column: "Clienteid",
                principalTable: "Clientes",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usuarios_Clientes_Clienteid",
                table: "Usuarios");

            migrationBuilder.AlterColumn<int>(
                name: "Clienteid",
                table: "Usuarios",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Usuarios_Clientes_Clienteid",
                table: "Usuarios",
                column: "Clienteid",
                principalTable: "Clientes",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
