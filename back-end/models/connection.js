// Referência usada para criar a conexão com o banco de dados:
// https://github.com/tryber/sd-03-live-lectures/blob/catch-up/express-mvc/models/connect.js
const mysqlx = require('@mysql/xdevapi');
require('dotenv/config');

let schema;
const config = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};
module.exports = () => {
  if (schema) {
    return Promise.resolve(schema);
  }
  return mysqlx
    .getSession(config)
    .then((session) => {
      schema = session.getSchema('Trybeer');
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
