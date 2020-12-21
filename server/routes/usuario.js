const express = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const {verificaToken, verificaAdminRole} = require('../middlewares/authentication')
const app = express()

app.get('/usuarios', verificaToken, (req, res) => {

    let total = req.query.total || 0
    total = Number(total)

    let limite = req.query.total || 5
    limite = Number(limite)

    Usuario.find({estado: true}, 'nombre email estado')
            .skip(total)
            .limit(limite).exec((err, usuarios) => {
        if(err){
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        Usuario.count({estado: true}, (err, conteo) => {
            res.json({
                ok: true,
                usuarios,
                total: conteo
            })
        })
    })
})
app.post('/usuarios', [verificaToken, verificaAdminRole], (req, res) => {
    
    const body = req.body
    const usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        //usuarioDB.password = null
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})
app.put('/usuarios/:id', [verificaToken, verificaAdminRole], (req, res) => {

    const id = req.params.id
    const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        res.json({ok: true, usuario: usuarioDB})
    })
})
app.delete('/usuarios/:id', [verificaToken, verificaAdminRole], (req, res) => {
    
    const id = req.params.id

    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, {estado: false}, {new: true}, (err, usuarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false, 
                err: {message: 'Usuario no encontrado'}
            })
        }
        res.json({ok: true, usuario: usuarioBorrado})
    })
})

module.exports = app