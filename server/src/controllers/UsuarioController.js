import { createUsuario, findUserByLoginPassword } from "../models/UsuarioModel.js";

export async function criarUsuario(req,res) {
    console.log('UusuarioController :: criarUsuario')
    const usuario = req.body;

    if(!usuario.login || !usuario.senha || !usuario.funcao){
        res.status(440).json({messagem:'Login, senha e funcao são obrigatórios'})
    }else{
        try {
            const [status, resposta] = await createUsuario(usuario);
            res.status(status).json(resposta);
        } catch (error) {
            console.log(error);
            res.status(500).json({message:'erro ao criar usuario'})
        }
    }
    
}

export async function logarUsuario(req,res) {
    console.log('UsuarioController :: logarUsuario');

    const {login, senha} = req.body;

    if(!login || !senha){
        res.status(400).json({message:'Usuario e senha sâo obrigatórios'})
    }else{
        try {
            const [status, resposta] = await findUserByLoginPassword(login, senha);
            res.status(status).json(resposta);
        } catch (error) {
            console.log(error)
            res.status(500).json({message: 'Erro ao efetuar login'})
        }
    }
}