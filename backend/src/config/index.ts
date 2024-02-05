import dotenv from "dotenv";
import path from "path";

// Cargar variables de entorno solo en desarrollo. En producción, se esperan variables de entorno del sistema.
if (process.env.NODE_ENV !== "production") {
  // Construir la ruta al archivo .env en la raíz del proyecto
  const envPath = path.resolve(__dirname, "../../../.env");
  // Intentar cargar el archivo .env usando la ruta construida
  const envFound = dotenv.config({ path: envPath });

  // Si estamos en desarrollo y no se encuentra el .env, lanzar un error
  if (process.env.NODE_ENV === "development" && envFound.error) {
    throw new Error("⚠️  Couldn't find .env file ⚠️");
  }
}

// Exportar configuración como un objeto. Utiliza variables de entorno o valores por defecto.
export default {
  // Puerto del servidor: predeterminado 3000 si PORT no está definido
  port: process.env.PORT || 3000,
  // URI de conexión a MongoDB: usa valor predeterminado si MONGODB_URI no está definido
  mongoDB: process.env.MONGODB_URI || "mongodb_default_uri",
  // Configuración de la base de datos SQL: host, usuario, contraseña, puerto y nombre de la base de datos
  sqlHost: process.env.SQL_HOST || "localhost",
  sqlUser: process.env.SQL_USER || "default_user",
  sqlPassword: process.env.SQL_PASSWORD || "default_password",
  sqlPort: parseInt(process.env.SQL_PORT || "3306", 10), // Asegurar que el puerto sea un número
  sqlDatabase: process.env.SQL_DATABASE || "default_database"
};
