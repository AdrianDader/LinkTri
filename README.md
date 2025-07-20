# ⛓️‍💥 LinkTri
#### Para conocer la aplicación, puedes consultar la [guía de usuario.](./FrontEnd/README.md)
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
# Clonar repositorio
git clone https://github.com/AdrianDader/LinkTri.git

# Frontend
cd linktri
cd frontend
npm install
npm run dev

# Backend
cd linktri
cd backend
composer install
cp .env.example .env
php artisan key:generate

```
3. Configura el archivo `.env`: path: `BackEnd\.env`. Aqui dejo unos datos de ejemplo:

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
4. Aparecerá el siguiente mensaje y le decimos que sí. cambia 'linktri_backend' por el nombre de tu DB en `BackEnd\.env`.

```bash

WARN  The database 'linktri_backend' does not exist on the 'mysql' connection.
Would you like to create it? (yes/no) [yes]

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
| vitest                             | 3.2.4    |

---

### 🖥️ Backend (Laravel)

Dependencias instaladas con Composer. Solo se listan paquetes externos (sin incluir extensiones propias de PHP):

> 🔍 Puedes obtener esta lista en consola con: `composer show`

Ejemplo de algunas librerías:

| Paquete                             | Versión   | Descripción breve                                      |
|-------------------------------------|-----------|--------------------------------------------------------|
| laravel/framework                   | 11.44.7   | Framework principal de Laravel                         |
| guzzlehttp/guzzle                   | 7.9.3     | Cliente HTTP para hacer solicitudes a servicios web    |
| mongodb/laravel-mongodb             | 5.4.1     | Extensión Eloquent para trabajar con MongoDB en Laravel|
| mongodb/mongodb                     | 2.0.0     | Driver oficial de MongoDB para PHP                     |
| fakerphp/faker                      | 1.24.1    | Generador de datos falsos para pruebas y desarrollo    |
| phpunit/phpunit                     | 11.5.15   | Framework de pruebas para PHP                          |
| pestphp/pest                        | 3.8.2     | Framework elegante para pruebas en PHP                 |
| mockery/mockery                     | 1.6.12    | Framework para crear mocks en pruebas                  |
| laravel/sanctum                     | 4.1.0     | Autenticación ligera para SPAs y APIs                  |
| laravel/breeze                      | 2.3.6     | Scaffolding simple de autenticación con Blade          |
| laravel/tinker                      | 2.10.1    | REPL interactivo para Laravel                          |
| laravel/sail                        | 1.41.1    | Entorno Docker ligero para desarrollo con Laravel      |
| laravel/pint                        | 1.22.0    | Formateador de código opinado para PHP                 |
| fruitcake/php-cors                  | 1.3.0     | Soporte CORS para aplicaciones Laravel                 |
| filp/whoops                         | 2.18.0    | Manejo de errores visual para desarrollo               |
| nunomaduro/collision                | 8.8.0     | Errores amigables en consola para Laravel              |
| nesbot/carbon                       | 3.9.0     | Manipulación de fechas basada en DateTime             |
| league/flysystem                    | 3.29.1    | Abstracción de sistema de archivos                     |
| symfony/http-foundation             | 7.2.5     | Capa orientada a objetos para manejar solicitudes HTTP |
| psr/log                             | 3.0.2     | Interfaz estándar de logging para PHP                  |
| graham-campbell/result-type         | 1.1.3     | Tipo Result para operaciones que pueden fallar         |


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


