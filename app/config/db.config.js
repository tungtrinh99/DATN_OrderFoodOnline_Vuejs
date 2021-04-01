const env= require('./env');
const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config({path:'./.env'});

const connection = mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});

module.exports = connection;