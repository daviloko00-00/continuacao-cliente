import 'dotenv/config'
import routes from "./routes/routes.js";
import express from "express"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/' ,routes);

app.listen(process.env.SERVER_PORT || 8081, ()=>{
    console.log(`Servidor rodando em: http://localhost:${8081}`)
})
console.log(process.env.DB_HOST);