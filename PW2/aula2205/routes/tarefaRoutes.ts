import { Router } from "express";
import { cadastrar, login } from "../controller/tarefaController";

const tarefaRouter = Router();

tarefaRouter.get('/cadastro', cadastrar)
tarefaRouter.get('/login', login)

export {tarefaRouter}