const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// const fs = require('fs');
// const path = require('path');

// const swaggerDocs = require('./src/swagger')

// AUT
// const swaggerUi = require("swagger-ui-express")
// const swaggerFile = require("./src/swagger-output.json")

const app = express()

const allowedOrigins = ['https://vhga.vercel.app', 'http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Acceso bloqueado por CORS, el origin no coincide con lista de origins permitidos'));
    }
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization']
}));

// app.use('*', cors())

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }))

// app.use(cors({
//     origin: function (origin, callback) {
//         console.log( origin );
//         console.log( allowedOrigins.includes(origin) );
//         if (!origin || allowedOrigins.includes(origin)) {
//             return callback(null, true);
//         }
//         return callback(new Error('Acceso bloqueado'));
//     }
// }));

require('dotenv').config()

app.use(cookieParser())

app.use(express.json())

app.use(express.static('public'))

// AUT
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ROUTERS
// PORTOFOLIO
const portofolio = require('./src/routers/portofolio.router')

const userRouter = require('./src/routers/user.router')
const dictionaryRouter = require('./src/routers/dictionary.router')
const bankRouter = require('./src/routers/bank.router')
const tradeRouter = require('./src/routers/trade.router')
const dashboard = require('./src/routers/dashboard.router')


// PORTOFOLIO
app.use('/api', portofolio)

app.use('/api', userRouter)
app.use('/api', dictionaryRouter)
app.use('/api', bankRouter)
app.use('/api', tradeRouter)
app.use('/api/', dashboard)

// swaggerDocs(app);

app.listen(process.env.PORT, () => {  
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`)
})

// export const getBaseUrl = () => {
//     if (process.env.NODE_ENV === 'development') {
//         return 'http://localhost:5000';
//     }
//     return process.env.NEXT_PUBLIC_VERCEL_URL;
// }

app.get('/', ( req, res ) => {
    res.send(`
        <html>
            <head>
                <title> API Administracion </title>
                <style>
                body { font-family: Arial, sans-serif; text-align: center; background-color: #FFF; }
                h2 { color: #339CFF; }
                p { font-size: 18px; color: #333; }
                </style>
            </head>
            <body>
                <h2> Bienvenidos a la api de administración! </h2>
                <p> acceso restringido </p>
            </body>
        </html>
    `)
})