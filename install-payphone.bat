@echo off
REM Script de Instalacion Rapida de Payphone para Windows

echo.
echo ==========================================
echo   Instalacion de Payphone - E-Commerce
echo ==========================================
echo.

REM Verificar que estamos en el directorio correcto
if not exist "package.json" (
    echo ERROR: Debes ejecutar este script desde la raiz del proyecto
    pause
    exit /b 1
)

echo Paso 1: Verificar estructura de archivos...
echo.

set missing_files=0

if exist "apps\backend\src\types\payphone.types.ts" (
    echo [OK] apps\backend\src\types\payphone.types.ts
) else (
    echo [X] apps\backend\src\types\payphone.types.ts - FALTANTE
    set /a missing_files+=1
)

if exist "apps\backend\src\services\payphone.service.ts" (
    echo [OK] apps\backend\src\services\payphone.service.ts
) else (
    echo [X] apps\backend\src\services\payphone.service.ts - FALTANTE
    set /a missing_files+=1
)

if exist "apps\backend\src\controllers\payment.controller.ts" (
    echo [OK] apps\backend\src\controllers\payment.controller.ts
) else (
    echo [X] apps\backend\src\controllers\payment.controller.ts - FALTANTE
    set /a missing_files+=1
)

if exist "apps\backend\src\routes\payment.routes.ts" (
    echo [OK] apps\backend\src\routes\payment.routes.ts
) else (
    echo [X] apps\backend\src\routes\payment.routes.ts - FALTANTE
    set /a missing_files+=1
)

if exist "apps\frontend\src\services\payment.service.ts" (
    echo [OK] apps\frontend\src\services\payment.service.ts
) else (
    echo [X] apps\frontend\src\services\payment.service.ts - FALTANTE
    set /a missing_files+=1
)

if exist "apps\frontend\src\app\payment\callback\page.tsx" (
    echo [OK] apps\frontend\src\app\payment\callback\page.tsx
) else (
    echo [X] apps\frontend\src\app\payment\callback\page.tsx - FALTANTE
    set /a missing_files+=1
)

if %missing_files% gtr 0 (
    echo.
    echo ERROR: Faltan %missing_files% archivos. Verifica la instalacion.
    pause
    exit /b 1
)

echo.
echo [OK] Todos los archivos estan presentes
echo.

REM Paso 2: Verificar .env
echo Paso 2: Verificar archivo .env
echo.

if not exist "apps\backend\.env" (
    echo ADVERTENCIA: No se encontro archivo .env
    echo.
    echo Por favor, crea el archivo manualmente:
    echo.
    echo 1. Copia apps\backend\.env.example a apps\backend\.env
    echo 2. Edita .env y agrega tus credenciales de Payphone
    echo 3. Lee PAYPHONE_SETUP.md para mas informacion
    echo.
    pause
) else (
    echo [OK] Archivo .env encontrado
    findstr /C:"PAYPHONE_TOKEN" apps\backend\.env >nul
    if errorlevel 1 (
        echo ADVERTENCIA: Falta PAYPHONE_TOKEN en .env
    ) else (
        echo [OK] PAYPHONE_TOKEN configurado
    )
    
    findstr /C:"PAYPHONE_STORE_ID" apps\backend\.env >nul
    if errorlevel 1 (
        echo ADVERTENCIA: Falta PAYPHONE_STORE_ID en .env
    ) else (
        echo [OK] PAYPHONE_STORE_ID configurado
    )
)

echo.
echo Paso 3: Verificar dependencias
echo.

if not exist "apps\backend\node_modules" (
    echo ADVERTENCIA: Dependencias del backend no instaladas
    echo.
    set /p install_be="Deseas instalarlas ahora? (s/n): "
    if /i "%install_be%"=="s" (
        echo Instalando dependencias del backend...
        cd apps\backend
        call npm install
        cd ..\..
    )
) else (
    echo [OK] Dependencias del backend instaladas
)

if not exist "apps\frontend\node_modules" (
    echo ADVERTENCIA: Dependencias del frontend no instaladas
    echo.
    set /p install_fe="Deseas instalarlas ahora? (s/n): "
    if /i "%install_fe%"=="s" (
        echo Instalando dependencias del frontend...
        cd apps\frontend
        call npm install
        cd ..\..
    )
) else (
    echo [OK] Dependencias del frontend instaladas
)

echo.
echo Paso 4: Ejecutar migracion de Prisma
echo.

set /p run_migration="Deseas ejecutar la migracion de Prisma ahora? (s/n): "
if /i "%run_migration%"=="s" (
    echo Ejecutando migracion...
    cd apps\backend
    call npx prisma migrate dev --name add_payphone_integration
    call npx prisma generate
    cd ..\..
    echo [OK] Migracion completada
) else (
    echo NOTA: Recuerda ejecutar: cd apps\backend ^&^& npx prisma migrate dev
)

echo.
echo Paso 5: Configurar Webhook en Payphone
echo.
echo Para recibir confirmaciones de pago, debes configurar el webhook:
echo.
echo En PRODUCCION:
echo    URL: https://tu-dominio.com/api/payment/webhooks/payphone
echo.
echo En DESARROLLO (con ngrok):
echo    1. Descarga ngrok: https://ngrok.com/download
echo    2. Ejecuta: ngrok http 5000
echo    3. Copia la URL HTTPS generada
echo    4. Agrega '/api/payment/webhooks/payphone' al final
echo    5. Configurala en: https://payphone.app/dashboard - Webhooks
echo.

echo.
echo ==========================================
echo   Instalacion Completada!
echo ==========================================
echo.
echo Proximos pasos:
echo.
echo 1. Iniciar servidores:
echo    Terminal 1: cd apps\backend ^&^& npm run dev
echo    Terminal 2: cd apps\frontend ^&^& npm run dev
echo.
echo 2. Probar el flujo:
echo    - Abre http://localhost:3000
echo    - Agrega productos al carrito
echo    - Haz clic en 'Proceder al pago'
echo    - Completa el pago en Payphone
echo.
echo 3. Documentacion:
echo    - PAYPHONE_SETUP.md - Configuracion detallada
echo    - PAYPHONE_QUICKSTART.md - Guia rapida
echo    - PAYPHONE_CHECKLIST.md - Lista de verificacion
echo.
echo Listo para recibir pagos!
echo.
pause
