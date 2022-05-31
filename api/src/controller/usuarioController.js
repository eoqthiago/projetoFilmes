import { login } from '../repository/usuarioRepository.js'

import { Router } from "express";

const server = Router();

server.post('/usuario/login', async (req, resp) => {
    try {
        const {email , senha} = req.body;
        const resposta = await login(email, senha);

        if(!resposta)
            throw new Error('deu ruim')

        resp.send(resposta)
    } catch (error) {
        resp.status(400).send({
            error: error.message
        })
    }
})




export default server

