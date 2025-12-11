import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // 10 intentos (aumentado de 5)
  message: "Demasiados intentos de login, intenta más tarde",
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // 5 registros por hora (aumentado de 3)
  message: "Demasiados registros, intenta más tarde",
});

// Rate limiter para carrito (muy permisivo)
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 500, // 500 peticiones por minuto (muy permisivo)
  message: "Demasiadas peticiones, intenta más tarde",
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // No aplicar rate limiting a GET (lectura)
    return req.method === 'GET';
  }
});
