// get the client
const mysql = require('mysql2');
/*
// create the connection to database
const connection = mysql.createConnection({
  host: 'mysql741.umbler.com',
  user: 'onbikes',
  database: 'on-bikes',
  password: '18061987Jr',
  multipleStatements: true
  });
*/


  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'onbikes',
    multipleStatements: true
    });


  module.exports = connection;



