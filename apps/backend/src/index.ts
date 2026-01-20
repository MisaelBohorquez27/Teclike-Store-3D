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
import authRouter from "./routes/auth.route";
import paymentRoutes from "./routes/payment.routes";

//Cargando variables de entorno
dotenv.config();

// Creando aplicacion express
const app = express();
const PORT = process.env.PORT || 5000;

//Configurando Middleware
const buildAllowedOrigins = (): string[] => {
  const origins: string[] = [];
  
  // Agregar el frontend URL en producción
  if (process.env.FRONTEND_URL) {
    origins.push(process.env.FRONTEND_URL);
  }
  
  // Agregar el frontend URL local en desarrollo
  if (process.env.FRONTEND_URL_LOCAL) {
    origins.push(process.env.FRONTEND_URL_LOCAL);
  }
  
  // Agregar otros orígenes desde ALLOWED_ORIGINS si existen
  if (process.env.ALLOWED_ORIGINS) {
    origins.push(...process.env.ALLOWED_ORIGINS.split(","));
  }
  
  // Valor por defecto si no hay nada configurado
  if (origins.length === 0) {
    origins.push("http://localhost:3000");
  }
  
  return origins.map(origin => origin.trim());
};

const allowedOrigins = buildAllowedOrigins();

console.log("📍 CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json({ limit: "10kb" })); // Limitar tamaño de payload
app.use(express.urlencoded({ limit: "10kb", extended: true }));

// Importas las Rutas y las usas
app.use("/api/auth", authRouter);
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
app.use("/api/payment", paymentRoutes);

//Ruta de prueba para ver si el servidor funciona
app.get("/", (req, res) => {
  res.json({ message: "El servidor está funcionando 🚀" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
