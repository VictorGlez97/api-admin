const postgre = require('../db/database')
const { comparePassword, encryptPassword } = require('../helpers/password')

const userController = {

    getAll: async( req, res ) => {
        try {
            const { rows } = await postgre.query('SELECT iduser, name, username, email, active, role FROM users')
            res.json({msg: 'OK', data: rows})
        } catch (error) {
            res.status(500).json({msg: error.msg})
        }
    },

    getById: async( req, res ) => {
        try {
            
            const { rows } = await postgre.query('SELECT iduser, name, username, email, active, role FROM users WHERE iduser = $1', [req.params.id])            

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
            
            const { name, username, email, password, active, role } = req.body

            const password_hashed = await encryptPassword(password);

            const sql = 'INSERT INTO users(name, username, email, password, active, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING name, username, email, active, role'

            const { rows } = await postgre.query(sql, [name, username, email, password_hashed, active, role])

            res.json({msg: 'Ok', data: rows[0]})

        } catch (error) {
            console.log( error );
            res.status(500).json({msg: error.msg})
        }
    },

    updateById: async( req, res ) => {
        try {
            
            const { name, username, email, acive, role } = req.body

            const sql = 'UPDATE users set name = $1, username = $2, email = $3, active = $4, role = $5 WHERE iduser = $6 RETURNING iduser, name, email, active, role'

            const { rows } = await postgre.query(sql, [name, username, email, acive, role, req.params.id])

            res.json({msg: 'Ok', data: rows[0]})

        } catch (error) {
            res.status(500).json({msg: error.msg})
        }
    },

    updatePassword: async( req, res ) => {
        try {
            
            const { password } = req.body;

            const passwordHashed = encryptPassword(password);

            const sql = 'UPDATE users set password = $1 WHERE iduser = $2 RETURNING iduser, name, email, active, role'
    
            const { rows } = await postgre.query(sql, [passwordHashed, req.params.id])

            res.json({msg: 'Ok', data: rows[0]})

        } catch (error) {
            console.log( error );
            res.status(500).json({msg: error.msg})
        }
    },

    login: async( req, res ) => {
        try {
            
            const { username, password } = req.body;

            const sql = 'SELECT username, password, name, role, email FROM users WHERE username = $1'

            const { rows } = await postgre.query(sql, [username]);

            if ( rows.length < 1 ) {
                return res.status(404).json({msg: 'Usuario o contraseña incorrecta', error: true});
            }

            const isMatch = await comparePassword(password, rows[0].password);

            if ( !isMatch ) {
                return res.status(404).json({msg: 'Usuario o contraseña incorrecta', error: true});
            }

            delete rows[0].password;
            return res.status(200).json({msg: `Bienvenid@ ${rows[0].name}!`, user: rows[0], error: false});

        } catch (error) {
            console.log(error);
            return res.json({msg: error, error: true})
        }
    }

}

module.exports = userController