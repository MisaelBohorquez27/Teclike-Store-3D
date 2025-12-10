import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products.route";
import offersRouter from "./routes/offers.route";
import BestSellerWeek from "./routes/BestSellerWeek.route";
import reviewsRouter from "./routes/reviews.route";
import contactRouter from "./routes/contact.route";
import cartRouter from "./routes/cart.route";
import searchRoutes from "./routes/search.route";
import PaginatedProducts from "./routes/paginatedProducts.route";
import checkout from "./routes/chekout.route";
import uploadRoutes from "./routes/upload.route";
import productImages from "./routes/productImages.route";
import authRouter from "./routes/auth.route"; // ← AÑADE ESTO

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
app.use("/api/auth", authRouter); // ← AÑADE ESTO
app.use("/api/products", productsRouter);
app.use("/api/offers", offersRouter);
app.use("/api/bestSellerWeek", BestSellerWeek);
app.use("/api/reviews", reviewsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/cart", cartRouter);
app.use("/api/search", searchRoutes);
app.use("/api/paginated", PaginatedProducts);
app.use("/api/checkout", checkout);
app.use("/api/upload", uploadRoutes);
app.use("/api/images", productImages);

//Ruta de prueba para ver si el servidor funciona
app.get("/", (req, res) => {
  res.json({ message: "El servidor está funcionando 🚀" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
