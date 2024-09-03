const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentacion APIE-commerce",
            destription: "Ecommerce dedicada a la venta de productos de Almacen",
        }
    },
    apis: ["./src/docs/**/*.yaml"], 
};

module.exports = { swaggerOptions};

