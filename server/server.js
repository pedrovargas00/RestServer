//Paera Atlas-mlab
//User: New-user pass: OMz3n1se1Q1cWwFv
//mongodb+srv://New-user:OMz3n1se1Q1cWwFv@cluster0.crkjr.mongodb.net/test

require('./config/config')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

//parse x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
//parse avec json
app.use(bodyParser.json())
app.use(require('./routes/usuario'))
mongoose.connect(process.env.URLDB, 
                {useNewUrlParser: true, useCreateIndex: true},
                (err, res) => {

    if(err) throw err

    console.log('Base de datos activa')
})
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT)
})