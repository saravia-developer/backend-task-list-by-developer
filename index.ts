import { app } from "./src/app";

const PORT = 3001;

app.listen(PORT, () =>
  console.log(`Aplicación escuchando en el puerto ${PORT}`)
);
