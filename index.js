const express= require('express')

const app=express()
app.use(express.json())

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'Alumnos'
let db =null

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    db = client.db(databaseName)
   
})

app.post('/crearcontacto',(req,res)=>{
    db.collection('Alumno').insertOne(req.body).
    then(data => 
        res.send({
            id:data.insertedId})
        )
        .catch(err => 
            res.send(err)
        ) 
})

app.get('/buscarcontacto',(req,res)=>{
    db.collection('Alumno').findOne({_id:new mongodb.ObjectId(req.body.id)})
    .then(data =>
        res.send({
            nombre:data.nombre
        })
    )
    .catch(err=>
        res.send(err))
})

app.put('/actualizarcontacto',(req,res)=>{
    db.collection('Alumno').findOne({_id:new mongodb.ObjectId(req.body.id)})
    .then(data =>{
        if(data!=null){
            db.collection('Alumno').updateOne(data,{
                $set:{
                    dni:req.body.dni,
                    nombre:req.body.nombre,
                    edad:req.body.edad,
                    telefono:req.body.telefono
                }
            });
            res.send({estado:"Todo correcto"})
            res.send(req.body)
        }
        else{
            res.send(
                {estado:"Error"}
            )
        }
        }
    )
    .catch(err=>
        res.send(err))
})

app.delete('/borracontacto',(req,res)=>{

})

app.listen(3000)
