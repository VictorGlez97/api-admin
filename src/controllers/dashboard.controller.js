const postgre = require('../db/database')

const dashboardController = {

    chartBanksByUser: async( req, res ) => {
        try {
            const { dataUsr } = req;
            const { rows } = await postgre.query('SELECT b.name, b.start, b.finish, b.amount, ( SELECT SUM(total) FROM trades WHERE bank = b.idbank ) AS bruto, ( ( SELECT SUM(total) FROM trades WHERE bank = b.idbank ) + b.amount ) AS total FROM banks b WHERE b.usr = $1', [dataUsr.iduser])
            res.json({msg: 'OK', data: rows})
        } catch (error) {
            res.status(500).json({msg: error.msg})
        }
    },

    chartByDate: async( req, res ) => {
        try {
            
            const { rows } = await postgre.query("WITH fechas AS (SELECT generate_series(b.start, b.finish, '1 day'::interval)::DATE AS fecha FROM banks b WHERE b.idbank = 1) SELECT f.fecha, COALESCE(SUM(CASE WHEN t.total > 0 THEN t.total ELSE 0 END), 0) AS total_ingresos, COALESCE(SUM(CASE WHEN t.total < 0 THEN t.total ELSE 0 END), 0) AS total_egresos, COALESCE(SUM(t.total), 0) AS total FROM fechas f LEFT JOIN trades t ON f.fecha = t.dateout::TIMESTAMP::DATE WHERE t.bank = $1 GROUP BY f.fecha ORDER BY f.fecha;", [req.params.id])            

            if (rows[0]) {
                return res.json({msg: 'Ok', data: rows})
            }

            res.status(404).json({msg: 'Not Found'})

        } catch (error) {
            res.status(500).json({msg: error.msg})            
        }
    }

}

module.exports = dashboardController