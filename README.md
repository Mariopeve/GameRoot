# 🎮 GameRoot - E-commerce de Videojuegos

![Estado del Proyecto](https://img.shields.io/badge/Estado-Terminado-success)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)

**GameRoot** es una plataforma web moderna de tipo SPA (Single Page Application) diseñada para la venta y gestión de claves digitales de videojuegos.

Este proyecto combina la robustez de **Laravel** en el backend con la interactividad de **React** en el frontend, unidos mediante **Inertia.js**. Además, integra Inteligencia Artificial (**Google Gemini**) para ofrecer un asistente virtual de recomendaciones.

---

## 🚀 Tecnologías Empleadas

El proyecto ha sido desarrollado utilizando un stack tecnológico actual:

### Backend
* ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) **Laravel 12:** API, Lógica de negocio, autenticación y gestión de correos.
* ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) **MySQL:** Base de datos relacional para usuarios, ventas y stock.

### Frontend
* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React + TypeScript:** Interfaz de usuario dinámica y tipado seguro.
* ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS:** Diseño responsivo y moderno.
* ![Inertia](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white) **Inertia.js:** Monolito moderno (sin API REST compleja).

### Integraciones
* 🤖 **Google Gemini AI:** Chatbot "GameBot" para recomendaciones de juegos en lenguaje natural.

---

## ✨ Funcionalidades Principales

### 👤 Parte Pública (Cliente)
* **Catálogo Interactivo:** Exploración de juegos con filtros de búsqueda y secciones de "Populares" y "Recientes".
* **GameBot (IA):** Asistente flotante integrado capaz de recomendar juegos basándose en los gustos del usuario.
* **Carrito de Compras:** Gestión de estado global, cálculo de totales y validación de stock.
* **Simulación de Compra:** Proceso de pago simulado con generación real de códigos de licencia únicos.
* **Gestión de Perfil:** Historial de compras, visualización de claves adquiridas y edición de datos.

### 🛡️ Parte Privada (Administrador)
* **Dashboard de Gestión:** Panel de control protegido para administradores.
* **CRUD de Videojuegos:** Crear, editar y eliminar juegos, gestionando precio, stock e imágenes.
* **Gestión de Usuarios:** Visualización y administración de cuentas registradas.

---

## 🛠️ Instalación y Despliegue Local

Sigue estos pasos para ejecutar el proyecto en tu ordenador (requiere PHP, Composer, Node.js y MySQL).

### 1. Clonar el repositorio
```bash
git clone [https://github.com/Mariopeve/GameRoot.git](https://github.com/Mariopeve/GameRoot.git)
cd GameRoot
