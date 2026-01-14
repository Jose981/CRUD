const express = require("express");
const app = express();
const userRoutes = require("./routes/usersRoutes");
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Llamar a las rutas
app.use("/", userRoutes);

//Manejar el error
app.use((req, res) => res.status(404).send(`Página no encontrada`));

//Escuchar en el puerto
app.listen(PORT, () =>
  console.log(
    `El servidor está escuchando en el puerto http://localhost${PORT}`
  )
);
