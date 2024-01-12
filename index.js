const express = require ("express");
// const { default: router } = require("./Controller/menu_do_dia");
const app = express();
const port = 4000;

app.use(express.json());

//MIDDLEWARE
app.use((req,res,next)=>{
    const DataeHora = new Date().toLocaleString();
    console.log("Tipo de Pedido: "+ req.method+", Data e Hora:"+DataeHora)
    next()
})
// ----------------------
//Conexao mongoose
const mongoose = require("mongoose");
// const url = "mongodb://localhost:27017";
// const dbName = "Restaurante"; 
// const connect = mongoose.connect(url, { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true});
const dbConn = mongoose.connect('mongodb://DiogoCardoso:wPGjkyjy8noxxyZS@ac-bfeevao-shard-00-00.flqestb.mongodb.net:27017,ac-bfeevao-shard-00-01.flqestb.mongodb.net:27017,ac-bfeevao-shard-00-02.flqestb.mongodb.net:27017/?ssl=true&replicaSet=atlas-2u4qpr-shard-0&authSource=admin&retryWrites=true&w=majority');
 
app.use((req, res, next) => { req.db = dbConn; next(); });
// chamar menu_do_dia
let pratos = require("./Controller/menu_do_dia");
const { Mongoose } = require("mongoose");
app.use("/pratos",pratos)
// --------------------
app.listen(port,()=> console.log("Restaurante Dionisio"));