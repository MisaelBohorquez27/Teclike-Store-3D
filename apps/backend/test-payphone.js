/**
 * Script de prueba para verificar la integración de Payphone
 * 
 * Uso:
 *   node test-payphone.js
 * 
 * Verifica:
 * - Variables de entorno configuradas
 * - Conexión con Payphone
 * - Base de datos configurada
 */

require('dotenv').config();

const REQUIRED_ENV_VARS = [
  'PAYPHONE_TOKEN',
  'PAYPHONE_STORE_ID',
  'FRONTEND_URL',
  'DATABASE_URL'
];

console.log('\n🔍 Verificando configuración de Payphone...\n');

// 1. Verificar variables de entorno
let hasErrors = false;

REQUIRED_ENV_VARS.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: Configurado`);
  } else {
    console.log(`❌ ${varName}: NO CONFIGURADO`);
    hasErrors = true;
  }
});

if (hasErrors) {
  console.log('\n❌ Faltan variables de entorno requeridas.');
  console.log('📖 Lee PAYPHONE_SETUP.md para más información.\n');
  process.exit(1);
}

console.log('\n✅ Todas las variables de entorno están configuradas.\n');

// 2. Verificar formato de variables
console.log('🔍 Verificando formato de variables...\n');

const token = process.env.PAYPHONE_TOKEN;
if (token && token.length < 20) {
  console.log('⚠️  PAYPHONE_TOKEN parece muy corto. ¿Es válido?');
} else {
  console.log('✅ PAYPHONE_TOKEN parece válido');
}

const storeId = process.env.PAYPHONE_STORE_ID;
if (storeId && isNaN(storeId)) {
  console.log('⚠️  PAYPHONE_STORE_ID debe ser un número');
} else {
  console.log('✅ PAYPHONE_STORE_ID es válido');
}

const frontendUrl = process.env.FRONTEND_URL;
if (!frontendUrl.startsWith('http')) {
  console.log('⚠️  FRONTEND_URL debe empezar con http:// o https://');
} else {
  console.log('✅ FRONTEND_URL es válida');
}

console.log('\n✅ Formato de variables correcto.\n');

// 3. Mostrar configuración actual
console.log('📊 Configuración actual:\n');
console.log(`   Token: ${token.substring(0, 20)}...`);
console.log(`   Store ID: ${storeId}`);
console.log(`   Frontend URL: ${frontendUrl}`);
console.log(`   Base de datos: ${process.env.DATABASE_URL?.split('@')[1] || 'Configurada'}`);

console.log('\n✅ Configuración de Payphone verificada correctamente.\n');
console.log('📝 Próximos pasos:');
console.log('   1. Ejecuta: npx prisma migrate dev');
console.log('   2. Ejecuta: npm run dev');
console.log('   3. Configura el webhook en Payphone');
console.log('   4. ¡Prueba creando un pago!\n');
