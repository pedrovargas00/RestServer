//Es ejecutado a lo largo del proceso Node
//Es actualizado en base al entorno de ejecución
//Puerto
process.env.PORT = process.env.PORT || 3000
//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
//Base de datos
let urlDB
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else{
    urlDB = 'mongodb+srv://New-user:OMz3n1se1Q1cWwFv@cluster0.crkjr.mongodb.net/test'
}
process.env.URLDB = urlDB