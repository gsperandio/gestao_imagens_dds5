import express from 'express';
import fileUpload from 'express-fileupload';

const app = express();
const porta = 5000;

import {criarImagem, deletarImagem, editarImagem, mostrarImagem, mostrarImagens, mostrarUmaImagem } from './controllers/ImagemController.js';

app.use(fileUpload());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API Funcionando!')
});

app.get('/public/:nomeImg', mostrarImagem);
//CRUD Imagem
app.post('/imagem',criarImagem);
app.get('/imagem',mostrarImagens);
app.get('/imagem/:id_imagem',mostrarUmaImagem);
app.put('/imagem/:id_imagem',editarImagem);
app.delete('/imagem/:id_imagem',deletarImagem)


app.listen(porta, ()=>{
    console.log(`API Rodando na porta ${porta}`)
});