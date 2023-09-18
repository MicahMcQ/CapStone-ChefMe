const { client } = require("pg");

let DB_URL;

if (process.enc.NODE_ENV ==="test") {
    DB_URL = "postgresql:///"
}else {
    DB_URL = "postgresql:///"
}

let db = new Client({
    connectionString: DB_URL
});

db.connect();

module.exports = db;