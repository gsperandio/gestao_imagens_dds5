import path from 'path';
import { createImagem, readImagem, readOneImage, updateImagem, deleteImagem } from '../models/ImagemModel.js';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function criarImagem(req,res) {
    console.log('ImagemController :: Criando Imagem');
    const {descricao} = req.body;
    const{imagem} = req.files;

    if(!descricao || !imagem){
        res.status(400).json({message:'Imagem e descrição são obrigatórios'});
    }else{
        const extensao = path.extname(imagem.name).toLocaleLowerCase();
        const extensoesPermitidas = ['.jpg','.png'];

        if(extensoesPermitidas.includes(extensao)){
            const nomeImg = `${Date.now()}${extensao}`;
            try {
                const [status,respota] = await createImagem(descricao,nomeImg,imagem);
                res.status(status).json(respota);
            } catch (error) {
                console.log(error);
                res.status(500).json({message:'ImagemController ::  Erro'});            
            }
        }else{
            res.status(415).json({message:'Arquivo inválido!'})
        }
    }
}

export async function mostrarImagens(req,res) {
    console.log('ImagemController :: Mostrando lista de imagens')
    
    try {
        const [status, resposta] = await readImagem();
        res.status(status).json(resposta);
    } catch (error) {
        res.status(500).json({message:'ImagemController ::  Erro'});
    }
}

export async function mostrarUmaImagem(req,res) {
    console.log('ImagemController :: MostrandoUmaImagem')
    const {id_imagem} = req.params;

    try {
        const [status, resposta] = await readOneImage(id_imagem);
        res.status(status).json(resposta);
    } catch (error) {
        res.status(500).json({message:'ImagemController ::  Erro'});
    }
}
export async function editarImagem(req,res) {
    console.log('ImagemController :: Editado uma imagem');
    const {id_imagem} = req.params;
    const {descricao} = req.body;

    try {
        const [status, resposta] = await updateImagem(descricao,id_imagem);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'ImagemController :: Erro'})
    }
}

export async function deletarImagem(req,res) {
    console.log('ImagemController :: Deletando Imagem');
    const {id_imagem} = req.params;
    
    try {
        const [status, resposta] = await deleteImagem(id_imagem);
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'ImagemController :: Erro'})
    }
}

export async function mostrarImagem(req,res) {
    console.log('ImagemController :: Mostrando Imagem');

    const {nomeImg} = req.params;
    const caminho = path.join(__dirname,'..','..','public','img',nomeImg);
    
    console.log(caminho);


    res.sendFile(caminho,(erro)=>{
        if(erro){
            console.log(erro)
            res.status(404).json({message:'Imagem não encontrada'})
        }
    });
}
