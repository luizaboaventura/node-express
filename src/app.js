import express from 'express';
import db from './config/dbConnect.js';
import routes from "./routes/index.js"

//conexão com o banco
db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () => {
    console.log('conexão com o banco feita com sucesso')
})

// instância express
const app = express();

// passar para o arquivo de rotas a instância do express para utilizarmos as rotas
routes(app);

export default app;