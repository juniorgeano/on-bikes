// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createPool({
  host: 'mysql741.umbler.com',
  port: 41890,
  user: 'onbikes',
  database: 'on-bikes',
  password: '18061987Jr',
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
  });


/*
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'onbikes',
    multipleStatements: true
    });
*/

  module.exports = connection;



