//Es ejecutado a lo largo del proceso Node
//Es actualizado en base al entorno de ejecución
//Puerto
process.env.PORT = process.env.PORT || 3000
//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
//Vencimiento de token
//60s 60m 24h 30d
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30
//SEED de autenticación
process.env.SEED = process.env.SEED || 'secret'
//Base de datos
let urlDB
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else{
    urlDB = 'mongodb+srv://New-user:OMz3n1se1Q1cWwFv@cluster0.crkjr.mongodb.net/test'
}
process.env.URLDB = urlDB

//Google client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '561665619959-66o3ha0sp5kg53n638jlqcm68bamcufe.apps.googleusercontent.com'