const postgre = require('../db/database')

const bankController = {

    getByUser: async( req, res ) => {
        try {
            console.log(req.params.id);
            const { rows } = await postgre.query('SELECT b.idbank, b.name FROM banks b INNER JOIN users u ON b.usr = u.iduser WHERE U.username = $1', [req.params.id])
            res.json({msg: 'OK', data: rows})
        } catch (error) {
            res.status(500).json({msg: error.msg})
        }
    },

    getById: async( req, res ) => {
        try {
            
            const { rows } = await postgre.query('SELECT idbank, name, start, finish, amount, active FROM banks WHERE idbank = $1', [req.params.id])            

            if (rows[0]) {
                return res.json({msg: 'Ok', data: rows})
            }

            res.status(404).json({msg: 'Not Found'})

        } catch (error) {
            res.status(500).json({msg: error.msg})            
        }
    },

    create: async( req, res ) => {
        try {
            
            const { name, start, finish, amount, active, usr } = req.body

            const sql = 'INSERT INTO banks(name, start, finish, amount, active, usr) VALUES($1, $2, $3, $4, $5, $6) RETURNING*'

            const { rows } = await postgre.query(sql, [name, start, finish, amount, active, usr])

            res.json({msg: 'Ok', data: rows[0]})

        } catch (error) {
            console.log( error );
            res.status(500).json({msg: error.msg})
        }
    },

    updateById: async( req, res ) => {
        try {
            
            const { name, start, finish, amount, active, usr } = req.body

            const sql = 'UPDATE trades set name = $1, start = $2, finish = $3, amount = $4, active = $5, usr = $6 WHERE idbank = $7 RETURNING *'

            const { rows } = await postgre.query(sql, [name, start, finish, amount, active, usr, req.params.id])

            res.json({msg: 'Ok', data: rows[0]})

        } catch (error) {
            res.status(500).json({msg: error.msg})
        }
    },

}

module.exports = bankController