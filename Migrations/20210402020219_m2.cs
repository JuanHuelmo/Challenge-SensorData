using Microsoft.EntityFrameworkCore.Migrations;

namespace Challenge.Migrations
{
    public partial class m2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "st",
                table: "Clientes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "st",
                table: "Clientes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
