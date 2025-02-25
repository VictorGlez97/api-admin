const postgre = require('../db/database')

const dictionaryController = {

    getByDictionary: async( req, res ) => {
        try {
            
            console.log( req.params.dictionary );

            const { rows } = await postgre.query("SELECT enumlabel FROM pg_enum WHERE enumtypid = $1::regtype", [req.params.dictionary])            

            if (rows[0]) {
                return res.json({msg: 'Ok', data: rows})
            }

            res.status(404).json({msg: 'Not Found'})

        } catch (error) {
            res.status(500).json({msg: error.msg})            
        }
    },
}

module.exports = dictionaryController