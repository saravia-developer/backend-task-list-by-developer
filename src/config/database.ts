import mysql from 'mysql2';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { AppDate } from '../lib/app-date';

class MYSQL {
  db: Connection
  
  constructor() {
    this.db = mysql.createConnection({
      port: 3322,
      host: 'localhost',
      user: 'root',
      password: 'saravia',
      database: 'task-list-by-developer'
    })

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

export const database = new MYSQL().db.promise()

// if(err) {
//   console.log('aplicación sin conexión a la base de datos');
//   return;
// }
