# Teclike-Store-3D

A store Teclike with 3D modeling that change and innovate the shoping industry experience. 

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)

Una plataforma moderna de e-commerce especializada en la venta de modelos 3D de alta calidad para diseñadores, arquitectos y creadores digitales.

## Características Principales

- **Catálogo de Productos 3D** - Modelos organizados por categorías
- **Sistema de Reseñas** - Valoraciones y comentarios de usuarios
- **Carrito de Compras** - Gestión completa de pedidos
- **Diseño Responsive** - Optimizado para todos los dispositivos
- **Panel de Administración** - Gestión de productos y órdenes

## Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: React Icons
- **3D**: React Three Fiber

### Backend
- **Runtime**: Node.js
- **ORM**: Prisma
- **Base de Datos**: PostgreSQL
- **API**: RESTful API

## 📋 Prerrequisitos

- Node.js 18+
- pnpm 8+
- PostgreSQL 15+
- Git

## 🚀 Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/vective3d-store.git
cd vective3d-store

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env

# Configurar base de datos
cd packages/db
pnpm prisma generate
pnpm prisma migrate dev

# Ejecutar en desarrollo
cd ../..
pnpm dev
