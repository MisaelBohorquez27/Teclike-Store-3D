#!/bin/bash

# 🚀 Script de Instalación Rápida de Payphone
# Este script te guía paso a paso en la configuración

echo ""
echo "🎉 ====================================="
echo "   Instalación de Payphone - E-Commerce"
echo "   ====================================="
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: Debes ejecutar este script desde la raíz del proyecto"
    exit 1
fi

echo "📋 Paso 1: Verificar estructura de archivos..."
echo ""

# Verificar archivos creados
FILES=(
    "apps/backend/src/types/payphone.types.ts"
    "apps/backend/src/services/payphone.service.ts"
    "apps/backend/src/controllers/payment.controller.ts"
    "apps/backend/src/routes/payment.routes.ts"
    "apps/frontend/src/services/payment.service.ts"
    "apps/frontend/src/app/payment/callback/page.tsx"
)

missing_files=0
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - FALTANTE"
        missing_files=$((missing_files + 1))
    fi
done

if [ $missing_files -gt 0 ]; then
    echo ""
    echo "❌ Faltan $missing_files archivos. Verifica la instalación."
    exit 1
fi

echo ""
echo "✅ Todos los archivos están presentes"
echo ""

# Paso 2: Configurar variables de entorno
echo "📋 Paso 2: Configurar variables de entorno"
echo ""

if [ ! -f "apps/backend/.env" ]; then
    echo "⚠️  No se encontró archivo .env"
    echo ""
    read -p "¿Deseas crear uno ahora? (s/n): " create_env
    
    if [ "$create_env" = "s" ]; then
        echo ""
        read -p "Ingresa tu PAYPHONE_TOKEN: " payphone_token
        read -p "Ingresa tu PAYPHONE_STORE_ID: " store_id
        read -p "Ingresa FRONTEND_URL (default: http://localhost:3000): " frontend_url
        frontend_url=${frontend_url:-http://localhost:3000}
        
        cat > apps/backend/.env << EOF
# Payphone Configuration
PAYPHONE_TOKEN=$payphone_token
PAYPHONE_STORE_ID=$store_id
FRONTEND_URL=$frontend_url

# Database (ajusta según tu configuración)
DATABASE_URL=postgresql://user:password@localhost:5432/teclike_store

# JWT Secret (ajusta según tu configuración)
JWT_SECRET=tu_jwt_secret_aqui

# Redis (ajusta según tu configuración)
REDIS_URL=redis://localhost:6379

# Server
PORT=5000
NODE_ENV=development
EOF
        
        echo ""
        echo "✅ Archivo .env creado en apps/backend/.env"
        echo "⚠️  Recuerda ajustar DATABASE_URL, JWT_SECRET y REDIS_URL"
    else
        echo ""
        echo "⚠️  Debes configurar el archivo .env manualmente"
        echo "📖 Lee PAYPHONE_SETUP.md para más información"
        exit 1
    fi
else
    echo "✅ Archivo .env encontrado"
    
    # Verificar variables de Payphone
    if ! grep -q "PAYPHONE_TOKEN" apps/backend/.env; then
        echo "⚠️  Falta PAYPHONE_TOKEN en .env"
        echo "📖 Lee PAYPHONE_SETUP.md para configurarlo"
    else
        echo "✅ PAYPHONE_TOKEN configurado"
    fi
    
    if ! grep -q "PAYPHONE_STORE_ID" apps/backend/.env; then
        echo "⚠️  Falta PAYPHONE_STORE_ID en .env"
        echo "📖 Lee PAYPHONE_SETUP.md para configurarlo"
    else
        echo "✅ PAYPHONE_STORE_ID configurado"
    fi
fi

echo ""
echo "📋 Paso 3: Verificar instalación de dependencias"
echo ""

cd apps/backend
if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencias del backend no instaladas"
    read -p "¿Deseas instalarlas ahora? (s/n): " install_deps
    if [ "$install_deps" = "s" ]; then
        echo "📦 Instalando dependencias del backend..."
        npm install
    fi
else
    echo "✅ Dependencias del backend instaladas"
fi

cd ../../

cd apps/frontend
if [ ! -d "node_modules" ]; then
    echo "⚠️  Dependencias del frontend no instaladas"
    read -p "¿Deseas instalarlas ahora? (s/n): " install_deps_fe
    if [ "$install_deps_fe" = "s" ]; then
        echo "📦 Instalando dependencias del frontend..."
        npm install
    fi
else
    echo "✅ Dependencias del frontend instaladas"
fi

cd ../../

echo ""
echo "📋 Paso 4: Ejecutar migración de Prisma"
echo ""

read -p "¿Deseas ejecutar la migración de Prisma ahora? (s/n): " run_migration

if [ "$run_migration" = "s" ]; then
    cd apps/backend
    echo "🔄 Ejecutando migración..."
    npx prisma migrate dev --name add_payphone_integration
    npx prisma generate
    cd ../../
    echo "✅ Migración completada"
else
    echo "⚠️  Recuerda ejecutar: cd apps/backend && npx prisma migrate dev"
fi

echo ""
echo "📋 Paso 5: Configurar Webhook en Payphone"
echo ""
echo "Para recibir confirmaciones de pago, debes configurar el webhook:"
echo ""
echo "En PRODUCCIÓN:"
echo "   URL: https://tu-dominio.com/api/payment/webhooks/payphone"
echo ""
echo "En DESARROLLO (con ngrok):"
echo "   1. Ejecuta: npx ngrok http 5000"
echo "   2. Copia la URL HTTPS generada"
echo "   3. Agrega '/api/payment/webhooks/payphone' al final"
echo "   4. Configúrala en: https://payphone.app/dashboard → Webhooks"
echo ""

read -p "¿Deseas iniciar ngrok ahora? (s/n): " start_ngrok

if [ "$start_ngrok" = "s" ]; then
    echo ""
    echo "🚀 Iniciando ngrok..."
    echo "⚠️  Copia la URL HTTPS y configúrala en Payphone"
    echo "⚠️  Presiona Ctrl+C para detener ngrok cuando termines"
    echo ""
    npx ngrok http 5000
fi

echo ""
echo "✅ ====================================="
echo "   Instalación Completada!"
echo "   ====================================="
echo ""
echo "📝 Próximos pasos:"
echo ""
echo "1. Iniciar servidores:"
echo "   Terminal 1: cd apps/backend && npm run dev"
echo "   Terminal 2: cd apps/frontend && npm run dev"
echo ""
echo "2. Probar el flujo:"
echo "   - Abre http://localhost:3000"
echo "   - Agrega productos al carrito"
echo "   - Haz clic en 'Proceder al pago'"
echo "   - Completa el pago en Payphone"
echo ""
echo "3. Documentación:"
echo "   📖 PAYPHONE_SETUP.md - Configuración detallada"
echo "   🚀 PAYPHONE_QUICKSTART.md - Guía rápida"
echo "   ✅ PAYPHONE_CHECKLIST.md - Lista de verificación"
echo ""
echo "¡Listo para recibir pagos! 💰"
echo ""
