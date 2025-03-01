const postgre = require('../db/database')

const tradeController = {

    // getAll: async( req, res ) => {
    //     try {
    //         const { rows } = await postgre.query('SELECT idtrade, mov, type, pe, sl, tp, pips, total, dateIn, dateOut, usr FROM trade')
    //         res.json({msg: 'OK', data: rows})
    //     } catch (error) {
    //         res.status(500).json({msg: error.msg})
    //     }
    // },

    getById: async( req, res ) => {
        try {
            
            const { rows } = await postgre.query('SELECT t.idtrade, t.mov, t.type, t.market, t.pe, t.sl, t.tp, t.pips, t.total, t.datein, t.dateout, t.comment, b.name, u.name, u.username, u.email, u.role FROM trades t INNER JOIN banks b ON b.idbank = t.bank INNER JOIN users u ON u.iduser = b.usr WHERE u.iduser = $1', [req.params.id])            

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
            
            const { mov, type, market, pe, sl, tp, pips, total, dateIn, dateOut, bank, comment } = req.body

            const sql = 'INSERT INTO trades(mov, type, market, pe, sl, tp, pips, total, dateIn, dateOut, bank, comment) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING mov, type, pe, sl, tp, pips, total, dateIn, dateOut'

            const { rows } = await postgre.query(sql, [mov, type, market, pe, sl, tp, pips, total, dateIn, dateOut, bank, comment])

            res.json({msg: 'Ok', data: rows[0]})

        } catch (error) {
            console.log( error );
            res.status(500).json({msg: error.msg})
        }
    },

    updateById: async( req, res ) => {
        try {
            
            const { mov, type, market, pe, sl, tp, pips, total, dateIn, dateOut, bank, comment } = req.body

            const sql = 'UPDATE trades set mov = $1, type = $2, market = $3, pe = $4, sl = $5, tp = $6, pips = $7, total = $8, bank = $9, comment = $10 WHERE idtrade = $11 RETURNING *'

            const { rows } = await postgre.query(sql, [mov, type, market, pe, sl, tp, pips, total, dateIn, dateOut, bank, comment, req.params.id])

            res.json({msg: 'Ok', data: rows[0]})

        } catch (error) {
            res.status(500).json({msg: error.msg})
        }
    },

}

module.exports = tradeController