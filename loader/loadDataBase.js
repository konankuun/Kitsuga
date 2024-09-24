const mysql = require("mysql")

module.exports = async() =>{
    let db = await new mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "kitsuga"
    })   
    return db;
}