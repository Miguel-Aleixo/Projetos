import { Request, Response } from "express";

function cadastrar(req: Request, res: Response) {
    res.render('cadastro')
}

function login(req: Request, res: Response) {
    res.render('login')
}


export {cadastrar, login}