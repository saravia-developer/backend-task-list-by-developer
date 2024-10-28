import enviroment from 'dotenv';
enviroment.config();

export const env = {
  database: {
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3322,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }
}