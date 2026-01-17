import { PrismaClient } from '@prisma/client';

console.log('🔧 Prueba de conexión a Supabase');
console.log('DATABASE_URL:', process.env.SUPABASE_DATABASE_URL);
console.log('DIRECT_URL:', process.env.SUPABASE_DIRECT_URL);
console.log('');

console.log('1. Creando PrismaClient...');
const prisma = new PrismaClient();

console.log('2. PrismaClient creado, intentando conectar...');

(async () => {
  try {
    console.log('3. Ejecutando $queryRaw...');
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Conexión exitosa:', result);
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  } finally {
    console.log('4. Desconectando...');
    await prisma.$disconnect();
    console.log('✅ Desconectado');
  }
})();

setTimeout(() => {
  console.error('❌ TIMEOUT después de 10 segundos');
  process.exit(1);
}, 10000);
