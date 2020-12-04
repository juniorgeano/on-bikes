// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createPool({
  host: 'mysql741.umbler.com',
  port: 41890,
  user: 'onbikes',
  database: 'onbikes',
  password: '18061987Jr',
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  });

  module.exports = connection;



