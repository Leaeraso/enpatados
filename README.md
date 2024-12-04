# API Enpatados

Este proyecto es una APIrest para un e-commerce para la venta de medias y lentes de sol, con psible expansion a mas indumentaria. Permite a los usuarios poder explorar productos, agregar al carrito, realizar la compra

<p>
Algunos de los puntos que se trabajaron:
</p>

- Alta, baja y modificacion de productos
- Gestion de registro e inicio de sesión con autenticación y encriptado
- Administración de ordenes de compra con estados
- Actualización de stock
- Alta, baja y modificación de categorias y subcategorias
- Manejo de imagenes de los productos
- Gestion de usuarios a traves de roles

###Tecnologias utilizadas
<ol>
<li>NodeJS con Express</li>
<li>Sequelize</li>
<li>TypeScript</li>
<li>Docker</li>
<li>JWT</li>
<li>Bcrypt</li>
<li>Cookie Parser</li>
<li>Node mailer</li>
</ol>

**Entre otras...**

##Instalación y utilización

####1. Clonar el repositorio
```
git clone https://github.com/Leaeraso/enpatados

```
####2. Instalar dependencias
```
npm install

```
####3. Configurar .env
**Explicación mas abajo**
####4. Ejecutar seeders
```
npx sequelize-cli db:seed:all

```
####5. Iniciar el servidor
```
npm run dev

```

## Configuración de variables de entorno
### Variables de Entorno

| Variable             | Descripción                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `HTTP_PORT`          | Puerto donde se ejecutará la API (por defecto, 3000).                      |
| `SECRET_KEY`         | Clave para firmar los tokens JWT.                                  |
| `EXPIRE_TOKEN`       | Tiempo de expiración de los tokens.               |
| `MYSQL_HOST`         | Host del servidor MySQL.                                              |
| `MYSQL_USER`         | Usuario de la base de datos MySQL.                                         |
| `MYSQL_PASS`         | Contraseña del usuario de MySQL.                                           |
| `MYSQL_DB`           | Nombre de la base de datos.                                                |
| `MYSQL_PORT`         | Puerto de conexión al servidor MySQL (por defecto, 3306) |
| `EMAIL_USER` | Dirección de correo para enviar mails. |
|`EMAIL_PASS` | Contraseña de aplicación asociada al correo. |
| `PHONE_NUMBER` | Número de telefono para enviar mensajes por WhatsApp. |
| `CORS` | URLs permitidas para solicitudes desde el front y pruebas en el back. |
| `GOOGLE_CLIENT_ID` | ID de cliente de Google para autenticación OAuth 2.0. |
| `GOOGLE_CLIENT_SECRET` | Secreto de cliente de Google para autenticación OAuth 2.0. |
| `API_URL` | URL base de la API. |

## Obtención de variables
####1. EMAIL_PASS(Contraseña de aplicación):
- Ir a la configuración de tu proveedor de email
- Activar la autenticación en dos pasos
- Generar una contraseña de aplicación
####2. Google Oauth (client_id y client_secret):
- Ir a la consola de Google Cloud
- Crear un proyecto
- Habilitar la API de OAuth 2.0
- Configurar las credenciales y URLs de redirección

##Documentación
<p>
Para utilizar la documentación de la API y probar los endpoints, iniciar el servidor y entrar al siguiente endpoint:

```
http://localhost:3000/documentation/

```
</p>

##Licencia

<p>
Este proyecto está bajo la Licencia MIT. Consulta el archivo ```LICENSE``` para más detalles.
</p>

