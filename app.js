const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
  { id: 1, nombre: "Ryu", edad: 32, lugarProcedencia: "Japón" },
  { id: 2, nombre: "Chun-Li", edad: 29, lugarProcedencia: "China" },
  { id: 3, nombre: "Guile", edad: 35, lugarProcedencia: "Estados Unidos" },
  { id: 4, nombre: "Dhalsim", edad: 45, lugarProcedencia: "India" },
  { id: 5, nombre: "Blanka", edad: 32, lugarProcedencia: "Brasil" },
];

// GET Usuarios
app.get("/", (req, res) => {
  res.send(`
    <h1>Lista de usuarios</h1>
    <ul>
    ${usuarios
      .map(
        (usuario) =>
          `<li>ID: ${usuario.id} | Nombre: ${usuario.nombre} | Ciudad: ${usuario.lugarProcedencia}`
      )
      .join("")}
    </ul>
    
    <h2>Añadir nuevo usuario</h2>
    <form action="/usuarios" method="post">
    <label for="nombre">Nombre</label>
    <input type="test" id="nombre" name="nombre" required>
    <label for="lugarProcedencia">Lugar de procedencia</label>
    <input type="test" id="lugarProcedencia" name="lugarProcedencia" required>
    <button type="submit">Añadir Usuario</button>
    <a href="/usuarios">Usuarios JSON</a>
    </form>
    <h2>Buscar Usuario</h2>
    <form action="/usuarios/nombreUsuario" method="post">
    <label form="nombre">Nombre del usuario</label>
    <input type="test" id="nombre" name="nombre" required>
    <button type="submit">Buscar</button>
    </form>
    `);
});

// MOSTRAR Usuarios
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// CREAR Usuario
app.post("/usuarios", (req, res) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    lugarProcedencia: req.body.lugarProcedencia,
  };
  usuarios.push(nuevoUsuario);
  res.redirect("/");
});

//BUSCAR Usuario
app.post("/usuarios/nombreUsuario", (req, res) => {
  const nombreUsuario = req.body.nombre;
  res.redirect(`/usuarios/${nombreUsuario}`);
});

app.get("/usuarios/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const usuario = usuarios.find(nombre);

  if (usuario) {
    res.send(`
        <h1>Perfil del usuario</h1>
        <p>ID: ${usuario.id}</p>
        <p>Nombre: ${usuario.nombre}</p>
        <p>Edad: ${usuario.edad}</p>
        <p>Procedencia: ${usuario.lugarProcedencia}</p>
        <a href="/">Volver al inicio</a>
            `);
  } else {
    res
      .status(404)
      .send(`<h1>Usuario "${nombre}" no encontrado</h1><a href="/">Volver</a>`);
  }
});

//BORRAR Usuario

app.listen(3000, () => {
  console.log("Express está funcionando en el puerto 3000");
});
