⚠️_______________________________________________ **Advertencia** _______________________________________________⚠️

La API todavía está en desarrollo. Todo lo que encontrará en la siguiente documentación es funcional, pero el trabajo completo aún no ha sido terminado. 

_______________________________________________________________________________________________________________

## CONFIGURACIÓN:

### Primeros pasos:

#### **API:**

Antes de levantar el servidor, debemos realizar algunas configuraciones previas. Asegúrate de seguir los siguientes pasos:

- Instala los módulos de Node.js requeridos en el proyecto. Para ello, ejecuta el comando "npm install" tanto en la carpeta raíz del proyecto como en la carpeta API.

- Configura las variables de entorno necesarias en un archivo ".env" ubicado en la carpeta API. Este archivo debe contener la siguiente variable de entorno: 
  `JWT_SECRET=my_secret_key` (Puedes reemplazar "my_secret_key" por el valor que desees).

Con estos pasos, el servidor estará listo para ser iniciado y funcionar correctamente. Es importante asegurarse de que todas las dependencias estén instaladas y de que las variables de entorno estén correctamente configuradas para garantizar el correcto funcionamiento del servidor.

#### **Conexión a la base de datos con Prisma ORM:**
Para utilizar Prisma ORM en tu API, es necesario establecer una conexión a la base de datos PostgreSQL. Sigue los siguientes pasos para realizar esta conexión:

- Crea una base de datos PostgreSQL si aún no la tienes. Asegúrate de tener los siguientes datos: nombre de usuario, contraseña, host, puerto y nombre de la base de datos.
- Dentro de la carpeta "prisma" de tu proyecto, crea un archivo llamado ".env". Este archivo debe contener la siguiente variable: `DATABASE_URL="postgresql://username:password@host:port/dbname"` (Reemplaza "username", "password", "host", "port" y "dbname" con los valores reales de tu base de datos).
- Una vez que hayas creado el archivo .env con la variable DATABASE_URL correctamente, puedes ejecutar el siguiente comando en la carpeta raíz del proyecto para generar las tablas necesarias en la base de datos: `npx prisma migrate dev --name init` Este comando actualizará el esquema de la base de datos con las últimas migraciones disponibles y generará las tablas necesarias.

Con estos pasos, ya deberías tener una conexión a la base de datos establecida con Prisma ORM en tu API. Puedes comenzar a utilizar los modelos generados por Prisma ORM para interactuar con la base de datos. Asegúrate de tener los conocimientos necesarios en la creación de bases de datos y en la utilización de la línea de comandos para poder llevar a cabo estos pasos correctamente.

## API

### Peticiones:
Para poder realizar peticiones con un usuario autenticado en Insomnia, Postman, o la aplicación que desees utilizar, necesitas utilizar el token que se genera en el proceso de autenticación (en este caso, llegará como respuesta de la petición post a la ruta Login) y enviarlo como parte de la cabecera de las peticiones protegidas.

Una vez que tengas el token de autenticación, debes incluirlo en la cabecera de las peticiones protegidas en Insomnia. La cabecera debe tener el nombre "Authorization" y el valor "Bearer [token]". Por ejemplo:

`Authorization: Bearer [token]`

Donde **[token]** es el token de autenticación que generaste en el controlador de login. Con esto, podrás realizar peticiones protegidas con el usuario autenticado.

#### **Usuario Administrador:**
Para crear el primer usuario administrador, puedes hacerlo a través de la ruta dedicada al registro de usuario. Debes definir por el cuerpo de la solicitud los pares clave-valor solicitados y establecer la propiedad "isAdmin" como "true".
Puedes asegurarte de que se haya creado correctamente verificando en la consola de psql o mediante la interfaz gráfica de Prisma ejecutando el comando `"npx prisma studio"` en la carpeta raíz del proyecto. Esto abrirá una interfaz gráfica en el navegador para que puedas administrar la base de datos. En el panel izquierdo, busca la sección "User" y haz clic en el botón "Crear nuevo usuario". A continuación, completa los datos del usuario, incluyendo el correo electrónico, el nombre, la contraseña y establece la propiedad "isAdmin" como "true".

### Seguridad: 

#### **Autenticación y autorización:**

La autenticación es el proceso de verificar que un usuario es quien dice ser y la autorización es el proceso de verificar que un usuario tiene acceso a un recurso específico. En esta API, se utilizan dos métodos para la autenticación y la autorización: bcrypt y JSON Web Token (JWT).

**Bcrypt**
La contraseña del usuario se encripta utilizando bcrypt, una función de hashing que se utiliza para proteger las contraseñas. Bcrypt es una buena opción para almacenar contraseñas porque utiliza un algoritmo de hash unidireccional que es difícil de romper. El método utilizado para encriptar la contraseña es bcrypt.hash() y se utiliza un valor de "sal" de 10 para generar un hash seguro.

**JSON Web Token**
Una vez que un usuario se autentica correctamente, se le proporciona un token de acceso que le da permiso para acceder a recursos específicos. Este token es un objeto JSON que se firma utilizando un algoritmo criptográfico, lo que garantiza que no se haya manipulado durante el transporte. En esta API, se utiliza el módulo json web token para generar y verificar tokens JWT.

##Base de datos

Estamos utilizando PostgreSQL como base de datos y Prisma ORM como herramienta de modelado y acceso a datos.

### Modelos:

#### **User:**
- id (integer): identificador único del usuario, generado automáticamente.
- name (string): nombre del usuario.
- email (string): correo electrónico del usuario, se utiliza como campo único.
- password (string): contraseña del usuario, se almacena hasheada utilizando bcrypt.
- address (string): dirección del usuario, opcional.
- profilePic (string): URL de la imagen de perfil del usuario, opcional.
- products (array): lista de los productos que ha publicado el usuario.
- carts (array): lista de los carritos de compra del usuario.

#### **Product:**
- id (integer): identificador único del producto, generado automáticamente.
- name (string): nombre del producto.
- code (string): código único del producto, opcional para productos futuros que no sean libros.
- isbn (string): número de ISBN del producto cuando es un libro, opcional.
- price (float): precio del producto.
- author (string): nombre del autor del producto cuando es un libro, opcional.
- publisher (string): nombre de la editorial del producto cuando es un libro, opcional.
- stock (integer): cantidad de unidades disponibles del producto.
- createdAt (datetime): fecha y hora de creación del producto, generada automáticamente.
- updatedAt (datetime): fecha y hora de última actualización del producto, generada automáticamente.
- purchases (array): lista de las compras realizadas del producto.
- users (array): lista de los usuarios que han publicado el producto.
- carts (array): lista de los carritos de compra que contienen el producto.
- cartProducts (array): lista de los detalles de los productos en los carritos de compra.

#### **Purchase:**
- id (integer): identificador único de la compra, generado automáticamente.
- buyer (string): nombre del comprador.
- quantity (integer): cantidad de unidades compradas.
- createdAt (datetime): fecha y hora de creación de la compra, generada automáticamente.
- updatedAt (datetime): fecha y hora de última actualización de la compra, generada automáticamente.
- product (object): objeto que representa el producto comprado.
- productId (integer): identificador único del producto comprado.

#### **Cart:**
- id (integer): identificador único del carrito de compra, generado automáticamente.
- createdAt (datetime): fecha y hora de creación del carrito de compra, generada automáticamente.
- updatedAt (datetime): fecha y hora de última actualización del carrito de compra, generada automáticamente.
- user (object): objeto que representa el usuario dueño del carrito de compra.
- userId (integer): identificador único del usuario dueño del carrito de compra.
- products (array): lista de los productos en el carrito de compra.
- cartProducts (array): lista de los detalles de los productos en el carrito de compra.

#### **CartProduct**
- cart (object): objeto que representa el carrito de compra al que pertenece el detalle del producto.
- cartId (integer): identificador único del carrito de compra.
- product (object): objeto que representa el producto en el detalle del carrito de compra.
- productId (integer): identificador único del producto.
- quantity (integer): cantidad de unidades del producto en el carrito de compra.

### Relaciones:

En el esquema de la base de datos existen cuatro relaciones entre las tablas o modelos:

- Un usuario puede tener muchos productos y un producto pertenece a un solo usuario. Esto se define con la relación "users" en el modelo de Product.
- Un producto puede tener muchas compras, y una compra pertenece a un solo producto. Esto se define con la relación "purchases" en el modelo de Product
- Un usuario puede tener muchos carritos y un carrito pertenece a un solo usuario. Esto se define con la relación "carts" en el modelo de User.
- Un carrito puede tener muchos productos y un producto puede estar en muchos carritos. Esto se define con la tabla intermedia "CartProduct"

La relación entre "Cart" y "Product" se establece mediante la relación entre la tabla "CartProduct" y las tablas "Cart" y "Product", que se definen en los campos "cart" y "product", respectivamente.
