import mysql, { Connection } from "mysql2";
import { AppDate } from "../lib/app-date";
import { env } from "../utils/env";

class MYSQL {
  db: Connection;

  constructor() {
    this.db = mysql.createConnection({
      port: env.database.port, 
      host: env.database.host,
      user: env.database.user,
      password: env.database.password,
      database: env.database.database,
    });

    this.testConnection()
  }

  testConnection() {
    this.db.connect((err) => {
      if(err) {
        console.log('No se conectó la base de datos: ', err)
      }
      console.log('Conectado exitosamente')  
      console.log(new AppDate().toMYSQLDatetime())  
    })
  }
}

export const database = new MYSQL().db
