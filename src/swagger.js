// const swaggerJsDoc = require('swagger-jsdoc')
// const swaggerUi = require('swagger-ui-express')

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "API Administracion",
//             version: "1.0.0",
//             description: "Documentación de api para administracion, gestion de trading y correos de portofolio",
//         },
//         servers: [
//             {
//                 url: `http://localhost:${process.env.PORT}`,
//                 description: "Servidor de desarrollo",
//             },
//         ],
//     },
//     basePath: "/",
//     apis: ["./src/routers/*.router.js"],
// }

// const swaggerSpec = swaggerJsDoc(options);

// const swaggerDocs = (app) => {
//     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//     console.log(`Swagger Docs disponibles en: http://localhost:${process.env.PORT}/api-docs`);
// }

// module.exports = swaggerDocs;

const swaggerAutogen = require('swagger-autogen')

const doc = {
    info: {
        title: "API Administracion",
        description: "Documentación de api para administracion, gestion de trading y correos de portofolio",
        version: "1.0.0",
    },
    host: "localhost:5000",
    schemes: ["http"],
    tags: [
        { name: "bank", description: "Operaciones relacionadas a la banca del usuario" },
        { name: "dashboard", description: "Operaciones relacionadas a las graficas del dashboard" },
        { name: "dictionary", description: "Operaciones relacionadas a los diccionarios de catalogos" },
        { name: "trade", description: "Operaciones relacionadas a las operaciones del usuario" },
        { name: "user", description: "Operaciones relacionadas a usuarios" },
        { name: "portofolio", description: "Operaciones relacionadas a potofolio personal" }
    ]
}

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routers/*.router.js"];

console.log( endpointsFiles );

swaggerAutogen(outputFile, endpointsFiles, doc);