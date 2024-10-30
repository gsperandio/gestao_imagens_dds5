import express from 'express';
import fileUpload from 'express-fileupload';

const app = express();
const porta = 5000;

import {criarImagem, mostrarImagem } from './controllers/ImagemController.js';

app.use(fileUpload());

app.get('/',(req,res)=>{
    res.send('API Funcionando!')
});

app.get('/public/:nomeImg', mostrarImagem);
//CRUD Imagem
app.post('/imagem', criarImagem);

app.listen(porta, ()=>{
    console.log(`API Rodando na porta ${porta}`)
});