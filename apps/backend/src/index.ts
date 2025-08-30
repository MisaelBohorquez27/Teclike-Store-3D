import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products";
import offersRouter from "./routes/offers";
import ordersRouter from "./routes/orders";
import reviewsRouter from "./routes/reviews";
import productsWithOfferRouter from "./routes/productsWithOffer";

//Cargando variables de entorno
dotenv.config();

// Creando aplicacion express
const app = express();
const PORT = process.env.PORT || 5000;

//Configurando Middleware
app.use(
  cors({
    origin: "http://localhost:3000", //este es el frontend
    credentials: true
  })
); // Con esto se permite consultas desde el frontend
app.use(express.json()); // Aqui para entender json en las peticiones

// Importas las Rutas y las usas
app.use("/api/products", productsRouter);
app.use("/api/offers", offersRouter);
app.use("/api/topSellingProd", ordersRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/productsWithOffers", productsWithOfferRouter);

//Ruta de prueba para ver si el servidor funciona
app.get("/", (req, res) => {
  res.json({ message: "El servidor está funcionando 🚀" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
