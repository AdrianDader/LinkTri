# ⛓️‍💥 LinkTri

Una plataforma para gestionar y compartir múltiples enlaces de forma organizada, con categorías, visibilidad personalizada y funciones colaborativas.

Proyecto full-stack inspirado en Linktree, desarrollado con **React (frontend)** y **Laravel (backend)**, que permite a los usuarios gestionar enlaces, personalizar sus perfiles y compartir contenido fácilmente.


---
## Instalación rápida
### 1. Configuración de base de datos (XAMPP)

1. 📦 Instala XAMPP desde su sitio oficial: [https://www.apachefriends.org/es/index.html](https://www.apachefriends.org/es/index.html)
2. Inicia los servicios de **Apache** y **MySQL** desde el panel de control de XAMPP.
3. Abre tu navegador y accede a: [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
4. Crea una nueva base de datos llamada, por ejemplo: `linktri_backend`.



### 2. Instalación del repositorio

```bash
# Clonal repositorio
git clone https://github.com/AdrianDader/LinkTri.git

# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
composer install
cp .env.example .env
php artisan key:generate

```
3. Configura el archivo `.env`: path: `BackEnd\.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=linktri_backend
DB_USERNAME=root
DB_PASSWORD=
```

```bash
# Backend
php artisan migrate          # ejecuta las migraciones
php artisan db:seed          # cargar datos de prueba
php artisan serve

```
---

## 📦 Dependencias

### 🖥️ Frontend (React + Vite)

Listado de paquetes esenciales utilizados en el cliente:

| Paquete                            | Versión  |
|------------------------------------|----------|
| @eslint/js                         | 9.28.0   |
| @lottiefiles/dotlottie-react       | 0.14.2   |
| @tanstack/react-query              | 5.80.6   |
| @types/react-dom                   | 19.1.6   |
| @types/react                       | 19.1.6   |
| @vitejs/plugin-react               | 4.5.1    |
| axios                              | 1.9.0    |
| eslint-plugin-react-hooks          | 5.2.0    |
| eslint-plugin-react-refresh        | 0.4.20   |
| eslint                             | 9.28.0   |
| globals                            | 16.2.0   |
| react-dom                          | 19.1.0   |
| react-router-dom                   | 7.6.2    |
| react-router-hash-link             | 2.4.3    |
| react-social-icons                 | 6.24.0   |
| react                              | 19.1.0   |
| vite                               | 6.3.5    |

---

### 🖥️ Backend (Laravel)

Dependencias instaladas con Composer. Solo se listan paquetes externos (sin incluir extensiones propias de PHP):

> 🔍 Puedes obtener esta lista en consola con: `composer show`

Ejemplo de algunas librerías:

| Paquete                             | Versión   | Descripción breve |
|-------------------------------------|-----------|--------------------|
| laravel/framework                   | 11.44.7   | Framework principal de Laravel |
| guzzlehttp/guzzle                   | 7.9.3     | Cliente HTTP |
| mongodb/laravel-mongodb             | 5.4.1     | Soporte MongoDB para Eloquent |
| fruitcake/php-cors                  | 1.3.0     | Middleware CORS |
| pestphp/pest                        | 3.8.2     | Framework de pruebas |
| symfony/console                     | 7.2.5     | Comandos CLI Symfony |
| league/flysystem                    | 3.29.1    | Abstracción del sistema de archivos |
| vlucas/phpdotenv                    | 5.6.1     | Carga de variables de entorno |
| fakerphp/faker                      | 1.24.1    | Generador de datos falsos |
| nunomaduro/collision                | 8.8.0     | Manejo elegante de errores CLI |
| laravel/sanctum                     | 4.1.0     | Autenticación API ligera |
| laravel/breeze                      | 2.3.6     | Scaffolding de auth con Blade |

> 📄 Ver la lista completa en el archivo `composer.lock` o usando `composer show`.

---

## 🛠 Requisitos

- **Node.js** 18+
- **PHP** 8.2+
- **Composer**

---

#### Proyecto desarrollado por:

**Adrian Dader Laguna**  
- GitHub: [https://github.com/AdrianDader](https://github.com/AdrianDader)  
- LinkedIn: [https://www.linkedin.com/in/adriandader/](https://www.linkedin.com/in/adriandader/)


