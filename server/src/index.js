import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();
const porta = 5000;

import {criarImagem, deletarImagem, editarImagem, mostrarImagem, downloadImagem, mostrarUmaImagem } from './controllers/ImagemController.js';
import { criarUsuario, logarUsuario } from './controllers/UsuarioController.js';
import { mostrarUmUsuario, mostrarUsuario  } from './controllers/UsuarioController.js';

app.use(fileUpload());
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('API Funcionando!')
});

app.get('/public/:nomeImg', mostrarImagem);
//CRUD Imagem
app.post('/imagem',criarImagem);
app.get('/imagem',downloadImagem);
app.get('/imagem/:id_imagem',mostrarUmaImagem);
app.put('/imagem/:id_imagem',editarImagem);
app.delete('/imagem/:id_imagem',deletarImagem)

//CRUD usuario
app.post('/usuario', criarUsuario);
app.get('/usuario',mostrarUsuario);
app.get('/usuario/:id_usuario',mostrarUmUsuario);

//Efetuar Login
app.post('/login', logarUsuario);

app.listen(porta, ()=>{
    console.log(`API Rodando na porta ${porta}`)
});