import 'dotenv/config'

import UsuarioController from './controller/usuarioController.js';
import FilmeController from './controller/filmeController.js';

import cors from 'cors';
import express from 'express';

const server = express();

server.use(cors());
server.use(express.json());
server.use('storage/capaDeFilmes', express.static('storage/capaDeFilmes'))


// configurações da api
server.use(UsuarioController);
server.use(FilmeController)





server.listen(process.env.PORT,
     () => console.log(`API esta Online na Porta ${process.env.PORT}`))



