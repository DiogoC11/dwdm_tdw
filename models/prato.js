
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Pratos = new Schema({
    Codigo_de_Prato:{
        type:Number,
        required:true,
        unique:true,
    },
    Nome_do_Prato:{
        type:String,
        required:true,
    },
    Categoria_do_Prato:{
        type:String,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model("Pratos",Pratos);

// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017";
// const dbName = "Restaurante";
// function DBConnection (){
//     return new Promise((resolve, reject) => {
//          connect.then((db) => {
//             console.log("Connected correctly to server");
//             const db = client.db(dbName);
//             const collection = db.collection("Menu_do_dia");
//             resolve(collection);
//             var pratos = require("./Controller/menu_do_dia");
//             app.use('/pratos',pratos);
//             app.listen(port,()=>console.log(`O meu restaurante - Restaurante Dionísio ${port}!`))
//         }).catch((err) => {
//             reject("Connection error: " + err);
//         });
//     });
// }
// module.exports = DBConnection


// var fs = require('fs');
// module.exports= {
//     Gravar,
//     Ler,
// } 

// function Gravar(caminho, data) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(caminho, JSON.stringify(data), (err) => {
//             if (err != null) {
//                 reject("Erro: Erro em salvar arquivos.");
//             }else{;
//                 resolve("Arquivo salvo com sucesso!");
//             }
//         });
//     })
// }

// function Ler(caminho){
//     return new Promise((resolve, reject) => {
//         fs.readFile(caminho, "utf8", (err, dados) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 let obj = JSON.parse(dados);
//                 resolve(obj)
//             }
//         }
//     )}
// )}
