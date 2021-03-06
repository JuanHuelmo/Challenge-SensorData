USE [master]
GO
/****** Object:  Database [Challenge]    Script Date: 4/4/2021 22:18:03 ******/
CREATE DATABASE [Challenge]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Challenge', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Challenge.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Challenge_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Challenge_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Challenge] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Challenge].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Challenge] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Challenge] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Challenge] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Challenge] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Challenge] SET ARITHABORT OFF 
GO
ALTER DATABASE [Challenge] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Challenge] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Challenge] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Challenge] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Challenge] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Challenge] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Challenge] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Challenge] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Challenge] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Challenge] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Challenge] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Challenge] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Challenge] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Challenge] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Challenge] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Challenge] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [Challenge] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Challenge] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Challenge] SET  MULTI_USER 
GO
ALTER DATABASE [Challenge] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Challenge] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Challenge] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Challenge] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Challenge] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Challenge] SET QUERY_STORE = OFF
GO
USE [Challenge]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/4/2021 22:18:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clientes]    Script Date: 4/4/2021 22:18:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clientes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[RazonSocial] [nvarchar](max) NOT NULL,
	[NroRut] [int] NOT NULL,
	[Direccion] [nvarchar](max) NOT NULL,
	[Pais] [nvarchar](max) NOT NULL,
	[Ciudad] [nvarchar](max) NOT NULL,
	[CodigoPostal] [int] NOT NULL,
	[Zona] [int] NOT NULL,
	[Telefono] [nvarchar](max) NOT NULL,
	[Fax] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Web] [nvarchar](max) NULL,
	[SeguroTransitos] [int] NOT NULL,
	[SeguroTransitoCargaSuelta] [int] NOT NULL,
	[Activo] [bit] NOT NULL,
 CONSTRAINT [PK_Clientes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PermisoOtorgados]    Script Date: 4/4/2021 22:18:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermisoOtorgados](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[PermisoId] [int] NULL,
	[UsuarioId] [int] NULL,
 CONSTRAINT [PK_PermisoOtorgados] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permisos]    Script Date: 4/4/2021 22:18:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permisos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Permisos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 4/4/2021 22:18:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [nvarchar](max) NOT NULL,
	[UserName] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[Clienteid] [int] NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Nombre] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210331181932_initial', N'3.1.13')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210401140616_migration2', N'3.1.13')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210401140810_migration3', N'3.1.13')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210401142813_migration4', N'3.1.13')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210401144043_migration5', N'3.1.13')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210401144516_migration6', N'3.1.13')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210401182840_migration7', N'3.1.13')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210402015209_m1', N'3.1.13')
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20210402020219_m2', N'3.1.13')
GO
SET IDENTITY_INSERT [dbo].[Clientes] ON 

INSERT [dbo].[Clientes] ([id], [RazonSocial], [NroRut], [Direccion], [Pais], [Ciudad], [CodigoPostal], [Zona], [Telefono], [Fax], [Email], [Web], [SeguroTransitos], [SeguroTransitoCargaSuelta], [Activo]) VALUES (3, N'Ro.SA', 21321323, N'garcia pintos 1123', N'Uruguay', N'Montevideo', 11800, 2, N'22093221', N'220391133', N'abs@gmail.com', N'www.roaderon.com', 1, 3, 1)
INSERT [dbo].[Clientes] ([id], [RazonSocial], [NroRut], [Direccion], [Pais], [Ciudad], [CodigoPostal], [Zona], [Telefono], [Fax], [Email], [Web], [SeguroTransitos], [SeguroTransitoCargaSuelta], [Activo]) VALUES (4, N'Roadeon.ltda', 2323131, N'23123', N'Albania', N'322', 3213, 1, N'32432244', N'24345344', N'huelmojuan@gmail.com', N'aliba.com.uy', 1, 1, 1)
INSERT [dbo].[Clientes] ([id], [RazonSocial], [NroRut], [Direccion], [Pais], [Ciudad], [CodigoPostal], [Zona], [Telefono], [Fax], [Email], [Web], [SeguroTransitos], [SeguroTransitoCargaSuelta], [Activo]) VALUES (5, N'Udem.Ltda', 24234564, N'Pedro Berro 1253', N'Uruguay', N'Montevideo', 11443, 2, N'32233422', N'34432243', N'abs@gmail.com', N'www.abs.com.uy', 2, 3, 0)
INSERT [dbo].[Clientes] ([id], [RazonSocial], [NroRut], [Direccion], [Pais], [Ciudad], [CodigoPostal], [Zona], [Telefono], [Fax], [Email], [Web], [SeguroTransitos], [SeguroTransitoCargaSuelta], [Activo]) VALUES (7, N'Cou.Sa', 64435354, N'Adelia 2332', N'Uruguay', N'Montevideo', 43231, 3, N'54443332', N'55545444', N'Al@al.com', N'www.al.com', 2, 3, 1)
SET IDENTITY_INSERT [dbo].[Clientes] OFF
GO
SET IDENTITY_INSERT [dbo].[PermisoOtorgados] ON 

INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (17, 1, 7)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (18, 2, 7)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (19, 3, 7)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (20, 4, 7)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (21, 5, 7)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (22, 6, 7)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (23, 8, 7)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (24, 7, 7)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (25, 9, 7)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (70, 2, 8)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (71, 3, 8)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (72, 4, 8)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (73, 5, 8)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (74, 6, 8)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (75, 7, 8)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (76, 8, 8)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (77, 9, 8)
INSERT [dbo].[PermisoOtorgados] ([Id], [PermisoId], [UsuarioId]) VALUES (95, 2, 5)
SET IDENTITY_INSERT [dbo].[PermisoOtorgados] OFF
GO
SET IDENTITY_INSERT [dbo].[Permisos] ON 

INSERT [dbo].[Permisos] ([Id], [Name], [Description]) VALUES (1, N'ListadoDeUsuarios', N'Permiso para ver los usuarios en el sistema')
INSERT [dbo].[Permisos] ([Id], [Name], [Description]) VALUES (2, N'AltaUsuario', N'Permiso para dar de alta usuarios')
INSERT [dbo].[Permisos] ([Id], [Name], [Description]) VALUES (3, N'ModificacionUsuario', N'Permiso para modificar usuarios existentes en el sistema')
INSERT [dbo].[Permisos] ([Id], [Name], [Description]) VALUES (4, N'BajaUsuario', N'Permiso para dar de baja usuarios existentes')
INSERT [dbo].[Permisos] ([Id], [Name], [Description]) VALUES (5, N'ListadoDeClientes', N'Permiso para visualizar Listado de Clientes')
INSERT [dbo].[Permisos] ([Id], [Name], [Description]) VALUES (6, N'AltaCliente', N'Permiso para dar de alta Clientes')
INSERT [dbo].[Permisos] ([Id], [Name], [Description]) VALUES (7, N'BajaCliente', N'Permiso para dar de baja clientes existentes')
INSERT [dbo].[Permisos] ([Id], [Name], [Description]) VALUES (8, N'VisualizacionMapa', N'Permiso para visualizar los mapas')
INSERT [dbo].[Permisos] ([Id], [Name], [Description]) VALUES (9, N'ModificacionCliente', N'Permiso para modificar clientes')
SET IDENTITY_INSERT [dbo].[Permisos] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([Id], [Descripcion], [UserName], [Password], [Clienteid], [Email], [Nombre]) VALUES (5, N'empleado3 permiso Alta Usu y Modificacion Usu', N'Empleado3', N'12345678', 3, N'fm@da.com.uy', N'empleado3')
INSERT [dbo].[Usuarios] ([Id], [Descripcion], [UserName], [Password], [Clienteid], [Email], [Nombre]) VALUES (7, N'empleado 1 - Tiene permiso a todo ', N'Empleado1', N'12345678', 3, N'empleado1@gmail.com', N'empleado1')
INSERT [dbo].[Usuarios] ([Id], [Descripcion], [UserName], [Password], [Clienteid], [Email], [Nombre]) VALUES (8, N'empleado 2 - Tiene permiso a todo menos Listado Usuarios ', N'Empleado2', N'12345678', 4, N'empleado2@gmail.com', N'empleado2')
INSERT [dbo].[Usuarios] ([Id], [Descripcion], [UserName], [Password], [Clienteid], [Email], [Nombre]) VALUES (9, N'empleado 4 - permisos modificar usuario, baja usuario, listado de clientes, alta clientes,baja clientes, visualizacion mapa', N'Empleado4', N'12345678', 4, N'empleado4@gmail.com', N'empleado4')
INSERT [dbo].[Usuarios] ([Id], [Descripcion], [UserName], [Password], [Clienteid], [Email], [Nombre]) VALUES (10, N'empleado 5 - permisos baja usuario, listado de clientes, alta clientes,baja clientes, visualizacion mapa', N'Empleado5', N'12345678', 4, N'empleado5@gmail.com', N'empleado5')
INSERT [dbo].[Usuarios] ([Id], [Descripcion], [UserName], [Password], [Clienteid], [Email], [Nombre]) VALUES (11, N'empleado 6 - listado de clientes, alta clientes,baja clientes, visualizacion mapa', N'Empleado6', N'12345678', 3, N'empleado6@gmail.com', N'empleado6')
INSERT [dbo].[Usuarios] ([Id], [Descripcion], [UserName], [Password], [Clienteid], [Email], [Nombre]) VALUES (13, N'empleado 7 -alta clientes,baja clientes, visualizacion mapa', N'Empleado7', N'12345678', 4, N'empleado7@gmail.com', N'empleado7')
INSERT [dbo].[Usuarios] ([Id], [Descripcion], [UserName], [Password], [Clienteid], [Email], [Nombre]) VALUES (15, N'No tiene ningun permiso', N'Empleado0', N'12345678', 3, N'empleado0@gmail.com', N'empleado0')
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO
/****** Object:  Index [IX_PermisoOtorgados_PermisoId]    Script Date: 4/4/2021 22:18:03 ******/
CREATE NONCLUSTERED INDEX [IX_PermisoOtorgados_PermisoId] ON [dbo].[PermisoOtorgados]
(
	[PermisoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_PermisoOtorgados_UsuarioId]    Script Date: 4/4/2021 22:18:03 ******/
CREATE NONCLUSTERED INDEX [IX_PermisoOtorgados_UsuarioId] ON [dbo].[PermisoOtorgados]
(
	[UsuarioId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Usuarios_Clienteid]    Script Date: 4/4/2021 22:18:03 ******/
CREATE NONCLUSTERED INDEX [IX_Usuarios_Clienteid] ON [dbo].[Usuarios]
(
	[Clienteid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Usuarios] ADD  DEFAULT (N'') FOR [Email]
GO
ALTER TABLE [dbo].[PermisoOtorgados]  WITH CHECK ADD  CONSTRAINT [FK_PermisoOtorgados_Permisos_PermisoId] FOREIGN KEY([PermisoId])
REFERENCES [dbo].[Permisos] ([Id])
GO
ALTER TABLE [dbo].[PermisoOtorgados] CHECK CONSTRAINT [FK_PermisoOtorgados_Permisos_PermisoId]
GO
ALTER TABLE [dbo].[PermisoOtorgados]  WITH CHECK ADD  CONSTRAINT [FK_PermisoOtorgados_Usuarios_UsuarioId] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuarios] ([Id])
GO
ALTER TABLE [dbo].[PermisoOtorgados] CHECK CONSTRAINT [FK_PermisoOtorgados_Usuarios_UsuarioId]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_Clientes_Clienteid] FOREIGN KEY([Clienteid])
REFERENCES [dbo].[Clientes] ([id])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_Usuarios_Clientes_Clienteid]
GO
USE [master]
GO
ALTER DATABASE [Challenge] SET  READ_WRITE 
GO
