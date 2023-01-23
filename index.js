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
    db.collection('Alumno').insertOne({
        dni:'123',
        nombre:'',
        edad: 12,
        telefono:'123456789'
    })
    res.send({
        dni:'123',
        nombre:'',
        edad: 12,
        telefono:'123456789'})
    })

app.get('/buscarcontacto',(req,res)=>{

})

app.put('/actualizacontacto',(req,res)=>{

})

app.delete('/borracontacto',(req,res)=>{

})

app.listen(3000,)
