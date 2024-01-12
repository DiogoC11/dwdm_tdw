// const { Db, ObjectId} = require("mongodb");
// const DBConnection = require("../models/prato");
const express = require('express')
const router = express.Router();
const Pratos = require('../models/prato')


    router.get('/',(req,res) => {
        // DBConnection().then((Pratos) => {
            Pratos.find().then((prato) => {
                if(prato != null){
                    return res.status(200).json(prato)
                }else{
                    return res.status(400).send("Não existem pratos no restaurante.");
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).send('Read File Error');
            })
        // }).catch((err) => {
        //     console.log(err);
        //     res.status(500).send('Read File Error');
        // });

        // Ler("models/ficheiros_menu.txt").then((file) => {
        //     res.status(200).json(file.pratos);
        // }).catch((err) => {
        //     console.log(err);
        //     res.status(500).send('Read File Error');
        // })

    });
    router.get('/:id',(req,res)=> {  
        const idprato = parseInt(req.params.id);

        Pratos.findOne({ Codigo_de_Prato: idprato }).then((prato) => {
            
            if(!prato){
                return res.status(404).send(`Não existe prato com o id ${idprato}.`);
            }
            res.status(200).json(prato);
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Read File Error");
        });



        // DBConnection().then((Pratos)=>{
        //     Pratos.find().toArray().then((pratos) => {
        //         const index = pratos.findIndex(prato => {
        //             return prato.id == idprato;
        //         });
        //         if(index === -1){
        //             res.status(404).send("Prato não encontrado.")
        //         }else{
        //             res.status(200).json(pratos[index]);
        //         }
        //     }).catch((err) => {
        //     console.log(err);
        //     res.status(500).send('Read File Error');
        //     })
        // }).catch((err) => {
        //     console.log(err);
        //     res.status(500).send('Read File Error');
        // })


        // let id = req.params.id;
                
        // Ler("models/ficheiros_menu.txt").then((file) => {
        //     res.status(200).json(file.pratos[id-1]);
        // }).catch((err) => {
        //     console.log(err);
        //     res.status(500).send('Read File Error');
        // })
    });
    router.post("/adicionar/:id", (req, res) =>{
        let idprato = parseInt(req.params.id);
        
        Pratos.findOne({Codigo_de_Prato:idprato}).then(async(prato) => {    
            if(prato){
                return res.status(400).send(`Não existe prato com o id ${idprato}.`)
            }
            if(!req.body.prato || req.body.prato === ""){
                return res.status(400).send("O elemento prato não pode estar vazio.")
            }
            if(!req.body.categoria_de_prato || req.body.categoria_de_prato === ""){
                return res.status(400).send("O elemento categoria_de_prato não pode tar vazio.")
            }
            await Pratos.create({"Codigo_de_Prato":idprato,"Nome_do_Prato":req.body.prato, "Categoria_do_Prato":req.body.categoria_de_prato});
            res.status(200).send("Prato adicionado com sucesso.")
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Read File Error');
        })

        // DBConnection().then((Pratos)=>{
        //  let erro = false;
        //     Pratos.find().toArray().then((pratos) => {
        //         const index = pratos.findIndex(prato => {
        //             return prato.id == idprato;
        //     });
        //     if(index !== -1){
        //         erro = true;
        //         res.status(400).send("Esse id já existe.")
        //     }else if(req.body.prato === ""){
        //         erro = true;
        //         res.status(400).send("O elemento prato não pode estar vazio.")
        //     }else if(req.body.categoria_de_prato === ""){
        //         erro = true;
        //         res.status(400).send("O elemento categoria_de_prato não pode tar vazio.")
        //     }else if(erro === false){
        //         Pratos.insertOne({"id":req.params.id,"prato":req.body.prato, "categoria_de_prato":req.body.categoria_de_prato});
        //     res.status(200).send("Prato adicionado com sucesso.")
        //     }
        // }).catch((err) =>{
        //     console.log(err);
        //     res.status(500).send("Read File Error");
        // })




        // Ler("models/ficheiros_menu.txt").then((file) => {
        //     file.pratos.push({"id": file.pratos.length+1,  "prato": req.body.prato, "categoria_de_prato": req.body.categoria_de_prato});
        //     Gravar("models/ficheiros_menu.txt", file).then(() => {
        //         res.status(200).send("O prato "+novoprato+" foi adicionado.")
        //     }).catch((err) => {
        //         console.log(err);
        //         res.status(500).send('Write File Error');
        //     });
        // }).catch((err) => {
        //     console.log(err);
        //     res.status(500).send('Read File Error');
        // })
    // })
})
    router.patch("/update/:id", (req,res) =>{
        let idprato = parseInt(req.params.id);
        Pratos.findOne({Codigo_de_Prato:idprato}).then(async (prato) =>{
            if(!prato){
                return res.status(400).send(`Não existe prato com o id ${idprato}.`)
            }
            if(!req.body.novoprato || req.body.novoprato === ""){
                return res.status(400).send("O elemento novoprato não pode estar vazio.")
            }
            if(!req.body.categoria_de_prato || req.body.categoria_de_prato === ""){
                return res.status(400).send("O elemento categoria_de_prato não pode tar vazio.")
            }
            await Pratos.updateOne({"Codigo_de_Prato": idprato}, {"Nome_do_Prato": req.body.novoprato, "Categoria_do_Prato": req.body.categoria_de_prato})
            res.status(200).send("Prato atualizado com sucesso.")
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Read File Error");
        });

        
        
        // DBConnection().then((Pratos)=>{
        //     let erro = false;
        //     Pratos.find().toArray().then((pratos) => {
        //         const index = pratos.findIndex(prato => {
        //             return prato.id == idprato;
        //     });
        //     if(index == -1){
        //         erro = true;
        //         res.status(400).send("O id inserido não existe.")
        //     }else if(req.body.novoprato === ""){
        //         erro = true;
        //         res.status(400).send("O elemento prato não pode estar vazio.")
        //     }else if(req.body.categoria_de_prato === ""){
        //         erro = true;
        //         res.status(400).send("O elemento categoria_de_prato não pode tar vazio.")
        //     }else if(erro === false){
        //         Pratos.deleteOne({_id: new ObjectId(pratos[index]._id)})
        //         Pratos.insertOne({"id":idprato,"prato":req.body.novoprato, "categoria_de_prato":req.body.categoria_de_prato});
        //     res.status(200).send("Prato atualizado com sucesso.")
        //     }
        // }).catch((err)=>{
        //     console.log(err);
        //     res.status(500).send("Read File Error");
        // })


            // Ler("models/ficheiros_menu.txt").then((file) => {
            //     if(idprato >=0 && idprato <= file.pratos.length){
            //         const index = file.pratos.findIndex(prato => {
            //             return prato.id == idprato;
            //         });
            //         file.pratos[index] = {"id":idprato, "prato":req.body.novoprato, "categoria_de_prato": req.body.categoria_do_prato};
            //         Gravar("models/ficheiros_menu.txt", file).then(() => {
            //             res.status(200).send("O prato "+ file.pratos[idprato].prato +" foi atualizado.")
            //         }).catch((err) => {
            //             console.log(err);
            //             res.status(500).send('Write File Error');
            //         });
            //     }else{
            //         res.status(400).json({message: "Erro: A posição não contem prato."})
            //     }
            // }).catch((err) => {
            //     console.log(err);
            //     res.status(500).send('Read File Error');
            // })
        // })
    })
    router.delete("/delete/:id", (req, res) => {
        let idprato = req.params.id;
        Pratos.findOne({Codigo_de_Prato:idprato}).then(async(prato)=>{
            if(!prato){
                return res.status(400).send(`Não existe prato com o id ${idprato}.`)
            }
            await Pratos.deleteOne({"Codigo_de_Prato":idprato})
            res.status(400).send("Prato eliminado com sucesso.")
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Read File Error");
        });


        // erro = false;
        // DBConnection().then((Pratos)=>{
        //     Pratos.find().toArray().then((pratos) => {
        //         const index = pratos.findIndex(prato => {
        //             return prato.id == idprato;
        //     });
        //     if(index === -1){
        //         res.status(400).send("O id inserido não existe.")
        //     }else{
        //         Pratos.deleteOne({_id: new ObjectId(pratos[index]._id)})
        //         res.status(400).send("Prato de id "+idprato+" deletado com sucesso.")
        //     }
        // }).catch((err)=>{
        //     console.log(err);
        //     res.status(500).send("Read File Error");
        // })


        // Ler("models/ficheiros_menu.txt").then((file) => {
        //     const index = file.pratos.findIndex(prato => {
        //         return prato.id == idprato;
        //     });
        //     if(index === -1){
        //         res.status(404).send('Prato not found!');
        //     }else{
        //         const nome = file.pratos[index].prato;
        //         file.pratos.splice(index,1);
        //         Gravar("models/ficheiros_menu.txt", file).then(() => {
        //             res.status(200).json({message: "Prato "+nome+" deletado."})     
        //         }).catch((err) => {
        //             console.log(err);
        //             res.status(500).send('Write File Error');
        //         });
        //     }
        // }).catch((err) => {
        //     console.log(err);
        //     res.status(500).send('Read File Error');
        // })
    })
    
    router.delete("/deleteAll", (req, res) => {
        Pratos.find().then(async(prato)=>{
            if(prato = null){
                return res.status(400).send("Não existem pratos no restaurante.")
            }
            await Pratos.deleteMany();
            res.status(200).send("Todos os pratos foram elimiados com sucesso.")
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Read File Error");
        });
        
        // DBConnection().then((Pratos) =>{
        //     Pratos.deleteMany()
        //     res.status(200).send("Todos os pratos foram eliminados.")
        // }).catch((err) =>{
        //     console.log(err);
        //     res.status(500).send("Read File Error");
        // })


        // const baseSchema = {
        //     pratos: []
        // }
        // Gravar("models/ficheiros_menu.txt", baseSchema).then(() => {
        //     res.status(200).json({message: "Todos os pratos foram deletados."})
        // }).catch((err) => {
        //     console.log(err);
        //     res.status(500).send('Write File Error');
        // });
    })

module.exports = router;