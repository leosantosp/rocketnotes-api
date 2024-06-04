require("dotenv/config"); // Fazer essa importação para ter acesso as variáveis de ambiente. 


require('express-async-errors');
const migrationsRun = require('./database/sqlite/migrations');
const AppError = require('./utils/AppError');
const express = require("express");
const routes = require("./routes");
const uploadConfig = require('./configs/upload');
migrationsRun();
const cors = require("cors"); // Importação do cors
const app = express();
app.use(cors()); // Acionando a função dentro das rotas
app.use(express.json());

// Criar ants das rotas
// static serve para arquivos estáticos
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER));


app.use(routes);

app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })


})



const PORT = process.env.SERVER_PORT || 3333;
app.listen(PORT, console.log(`The server is running on port ${PORT}`));