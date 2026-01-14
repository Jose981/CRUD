const express = require("express");
const route = express.Router();
let usuarios = require("../BBDD/usersList");

// Obtener todos
route.get("/", (req, res) => {
  res.send(`
    <h1>Lista de usuarios</h1>
    <ul>
      ${usuarios
        .map(
          (u) =>
            `<li>ID: ${u.id} | Nombre: ${u.nombre} | Ciudad: ${u.lugarProcedencia}</li>`
        )
        .join("")}
    </ul>
    
    <h2>Añadir nuevo usuario</h2>
    <form action="/usuarios" method="post">
      <label>Nombre</label>
      <input type="text" name="nombre" required>
      <label>Procedencia</label>
      <input type="text" name="lugarProcedencia" required>
      <button type="submit">Añadir Usuario</button>
      <a href="/usuarios">Ver JSON</a>
    </form>

    <h2>Buscar Usuario</h2>
    <form action="/usuarios/nombreUsuario" method="post">
      <label>Nombre del usuario</label>
      <input type="text" name="nombre" required>
      <button type="submit">Buscar</button>
    </form>
    
    <h2>Borrar Usuario</h2>
    <form action="/usuarios/borrarUsuario" method="post">
    <label>Nombre del usuario</label>
      <input type="text" name="nombre" required>
      <button type="submit">Borrar</button>    
      </form>
    
    <h2>Actualizar datos de un usuario</h2>
    <form action="/usuarios/actualizarDatos" method="post">
    <label>Nombre actual (para buscar):</label>
  <input type="text" name="nombreViejo" required>
  <br> 
  <br>
  <label>Nuevo nombre:</label>
  <input type="text" name="nuevoNombre">
  <label>Nueva edad:</label>
  <input type="text" name="nuevaEdad">
  <label>Nueva procedencia:</label>
  <input type="text" name="nuevaProcedencia">
  <button type="submit">Actualizar Datos</button>
  <form>
      `);
});

// MOSTRAR JSON
route.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// CREAR Usuario
route.post("/usuarios", (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    lugarProcedencia: req.body.lugarProcedencia,
  };
  usuarios.push(nuevoUsuario);
  res.redirect("/");
});

// BUSCAR Usuario (Redirección)
route.post("/usuarios/nombreUsuario", (req, res) => {
  const nombreUsuario = req.body.nombre;
  res.redirect(`/usuarios/${nombreUsuario}`);
});

// PERFIL Usuario
route.get("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  // Buscamos comparando el nombre (ignorando mayúsculas/minúsculas para mejor UX)
  const usuario = usuarios.find(
    (u) => u.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (usuario) {
    res.send(`
        <h1>Perfil del usuario</h1>
        <p>ID: ${usuario.id}</p>
        <p>Nombre: ${usuario.nombre}</p>
        <p>Procedencia: ${usuario.lugarProcedencia}</p>
        <a href="/">Volver al inicio</a>
    `);
  } else {
    res
      .status(404)
      .send(`<h1>Usuario "${nombre}" no encontrado</h1><a href="/">Volver</a>`);
  }
});

// BORRAR USUARIO
route.post("/usuarios/borrarUsuario", (req, res) => {
  const nombreBorrar = req.body.nombre;

  const existe = usuarios.some(
    (u) => u.nombre.toLocaleLowerCase() === nombreBorrar.toLocaleLowerCase()
  );

  if (existe) {
    usuarios = usuarios.filter(
      (u) => u.nombre.toLocaleLowerCase() !== nombreBorrar.toLocaleLowerCase()
    );
    res.redirect("/");
  } else {
    res.status(404).send(`Usuario no encontrado. <a href="/">Volver</a>`);
  }
});

// CAMBIAR DATOS
route.post("/usuarios/actualizarDatos", (req, res) => {
  const { nombreViejo, nuevoNombre, nuevaEdad, nuevaProcedencia } = req.body;

  const index = usuarios.findIndex(
    (u) => u.nombre.toLowerCase() === nombreViejo.toLowerCase()
  );

  if (index !== -1) {
    if (nuevoNombre) usuarios[index].nombre = nuevoNombre;
    if (nuevaEdad) usuarios[index].edad = nuevaEdad;
    if (nuevaProcedencia) usuarios[index].lugarProcedencia = nuevaProcedencia;

    res.redirect("/");
  } else {
    res
      .status(404)
      .send(`El usuario "${nombreViejo}" no existe. <a href="/">Volver</a>`);
  }
});
module.exports = route;
