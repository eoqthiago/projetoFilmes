import { alterarFilme, alterarImagem, buscaPorId, buscaPorNome, inserirFilme, listagemDeTodosFilmes, removerFilme } from '../repository/filmeRepository.js'

import { Router } from "express";
import multer from 'multer';

const server = Router();

const upload = multer({dest: 'storage/capaDeFilmes'});

server.post('/filme', async (req, resp) => {
    try {
        const filmeInserir = req.body;

        if  (!filmeInserir.nome)
            throw new Error('Nome do Filme é Obrigatorio');

        if  (!filmeInserir.sinopse)
            throw new Error('Sinopse do Filme é Obrigatorio');

        if  (filmeInserir.avaliacao == undefined || filmeInserir.avaliacao < 0)
            throw new Error('Avaliação do Filme é Obrigatorio');

        if  (!filmeInserir.lancamento)
            throw new Error('Lançamento do Filme é Obrigatorio');

        if  (!filmeInserir.usuario)
            throw new Error('Usuario Não Logado!');
    

    const resposta = await inserirFilme(filmeInserir);
    resp.send(resposta)
    } catch (err) {
        resp.status(400).send({
            error:err.message
        })
    }

})


server.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
    try {
        const {id} = req.params
        const imagem = req.file.path
        const resposta = await alterarImagem(imagem, id);
        if (resposta != 1)
            throw new Error('imagem não pode ser salva')
        resp.status(204).send()
        
    } catch (error) {
        resp.status(400).send({
            error: error.message
        })
    }

})


server.get('/filme', async (req, resp) => {
    try {
        const resposta =  await listagemDeTodosFilmes();
        resp.send(resposta)
    } catch (error) {
        resp.status(400).send({
            error: error.message
        })
    }
})

server.get('/filme/:id', async (req, resp) => {
    try {
        const {id} = req.params
        const resposta =  await buscaPorId(id);
        resp.send(resposta)
    } catch (error) {
        resp.status(400).send({
            error: error.message
        })
    }
})


server.get('/filme/busca/:nome', async (req, resp) => {
    try {
        const {nome} = req.params
        const resposta =  await buscaPorNome(nome);
        resp.send(resposta)
    } catch (error) {
        resp.status(400).send({
            error: error.message
        })
    }
})

server.delete('/filme/:id', async (req, resp) => {
    try {
        const {id} = req.params
        const resposta = await removerFilme(id)
        if (resposta != 1)
            throw new Error('não foi possivel excluir')
        resp.status(204).send()
    } catch (error) {
        resp.status(400).send({
            error: error.message
        })
    }
})


server.put('/filme/:id', async (req, resp) => {
    try {
        const {id} = req.params
        console.log(id)
        const filme = req.body
        console.log(filme)
        const resposta = await alterarFilme(id, filme);
        
        if( resposta != 1)
            throw new Error('não pode ser alterado')
        else{
            resp.status(204).send();
        }
    } catch (error) {
        
        resp.status(400).send({
            error: error.message
        })
    }
})















export default server;