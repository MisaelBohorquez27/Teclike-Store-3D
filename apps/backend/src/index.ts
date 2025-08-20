import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products";

//Cargando variables de entorno
dotenv.config();

// Creando aplicacion express
const app = express();
const PORT = process.env.PORT || 5000;

//Configurando Middleware
app.use(cors()); // Con esto se permite consultas desde el frontend
app.use(express.json()); // Aqui para entender json en las peticiones

// Importas las Rutas y las usas 
app.use("/products", productsRouter);

//Ruta de prueba para ver si el servidor funciona
app.get("/healthz", (req, res) => {
  res.json({ message: 'El servidor está funcionando 🚀'});
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
