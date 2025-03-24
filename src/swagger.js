const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Administracion",
            version: "1.0.0",
            description: "Documentación de api para administracion, gestion de trading y correos de portofolio",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: "Servidor de desarrollo",
            },
        ],
    },
    basePath: "/",
    apis: ["./src/routers/*.router.js"],
}

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger Docs disponibles en: http://localhost:${process.env.PORT}/api-docs`);
}

module.exports = swaggerDocs;