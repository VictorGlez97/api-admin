const express = require('express')
const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')

const secret = process.env.SECRET_KEY

const getToken = (dataUser) => {
    return jwt.sign(dataUser, secret, { expiresIn: '1h' });
}

const verifyToken = (req, res, next) => {
    
    let token = req.headers['authorization'];

    if ( token && token.startsWith('Bearer ') ) {
        token = token.slice(7, token.length);
    } else {
        return res.status(401).json({ error: true, msg: 'Token no proporcionado' });
    }
    
    try {
        
        const decoded = jwt.verify(token, secret);
        req.dataUsr = decoded;
        next(); 

    } catch (error) {
        return res.status(403).json({ error: true, msg: `token invalido o expirado ${error}` })
    }
}

module.exports = { getToken, verifyToken }