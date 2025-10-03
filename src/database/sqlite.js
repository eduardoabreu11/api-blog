import "dotenv/config";
import sqlite3 from "sqlite3";

const SQLite = sqlite3.verbose();

function query(command, parms, method = 'all'){
    return new Promise(function (resolve, reject){
        db[method](command, parms, function(error,result ){
            if(error)
                reject(error)
            else
            resolve(result);
        });
    });
}


const db = new SQLite.Database(process.env.DATABASE, SQLite.OPEN_READWRITE, (err)=>{
    if(err)
        return console.log("erro ao conectar com o banco: " + err.message)
});

export {db, query};