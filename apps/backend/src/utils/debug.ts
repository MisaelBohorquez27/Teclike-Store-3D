/**
 * Utilidad segura para logging en desarrollo
 * En producción (NODE_ENV=production), todos los logs están silenciados
 */

const isDevelopment = process.env.NODE_ENV === 'development';

export const debug = {
  log: (...args: any[]) => {
    if (isDevelopment) console.log(...args);
  },
  error: (...args: any[]) => {
    if (isDevelopment) console.error(...args);
  },
  warn: (...args: any[]) => {
    if (isDevelopment) console.warn(...args);
  },
  info: (...args: any[]) => {
    if (isDevelopment) console.info(...args);
  },
};
