import { createUsuario, findUserByLoginPassword, showOneUsuario } from "../models/UsuarioModel.js";

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

export async function mostrarUsuario(req,res) {
    console.log('UusarioController :: mostrarUsuario');

    try {
        const [status, resposta] = await readUsuario();
        res.status(status).json(resposta);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Erro ao mostrar usurios'})
    }
}

export async function mostrarUmUsuario(req,res) {
    console.log('UsuarioController :: mostrando usuario');

    const {id_usuario} = req.params;

    if(!id_usuario){
        res.status(400).json({message:'id inválido'})
    }else{
        try {
            const [status, resposta] = await showOneUsuario(id_usuario);
            res.status(status).json(resposta);
        } catch (error) {
            console.log(error)
            res.status(500).json({message:'Erro ao mostrar um usuário'})
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