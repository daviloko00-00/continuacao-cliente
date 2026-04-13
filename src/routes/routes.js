import { Router } from "express";
import categoriaroutes from "./categoriaRoutes.js";
import produtoRoutes from "./produtoRoutes.js";
import telefoneRoutes from "./telefoneRoutes.js";
import clienteroutes from "./clienteRoutes.js";

produtoRoutes
const routes = Router();

routes.use("/categorias", categoriaroutes)
routes.use("/produtos", produtoRoutes)
routes.use("/telefones", telefoneRoutes)
routes.use("/clientes", clienteroutes)



export default routes;