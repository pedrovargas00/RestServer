//Verificar un token
const jwt = require('jsonwebtoken')

const verificaToken = (req, res, next) => {

    const token = req.get('token') //Autorización

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok: false,
                err
            })
        }
        //Payload
        req.usuario = decoded.usuario
    })
    next()
    /*res.json({
        token
    })*/
}

//Verifica AdminRole
const verificaAdminRole = (req, res, next) => {

    const usuario = req.usuario

    if(usuario.role === 'ADMIN_ROLE'){
        next()
    }else{
        res.json({
            ok: false,
            err: {
                message: 'El usuario no es admin'
            }
        })
    }


}

module.exports = {verificaToken, verificaAdminRole}