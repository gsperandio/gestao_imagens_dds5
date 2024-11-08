import mysql from 'mysql2/promise';
import db from '../conexao.js';

export async function createUsuario(usuario) {
    console.log('UusuarioModel :: createUsuario');
    const conexao = mysql.createPool(db);

    const sql = 'INSERT INTO usuarios (login,senha,funcao) VALUE (?,?,?)';

    const params = [
        usuario.login,
        usuario.senha,
        usuario.funcao
    ];

    try {
        const [retorno] = await conexao.query(sql,params);
        return [201, {message: 'Usuário Cadastrado'}]
    } catch (error) {
        console.log(error)
        return [500, {message:'Erro ao cadastrar usuário'}]
    }
}

export async function readUsuario(req) {
    console.log('UsarioModel :: readUsuario');
    
    const conexao = mysql.createPool(db);
    const sql = 'SELECT * FROM usuarios';

    try {
        const [retorno] = await conexao.query(sql);
        return[200, retorno];
    } catch (error) {
        return[500, error]
    }
}

export async function mostrarUsuario(req,res) {
    console.log('UusarioController :: mostrarUsuario');

    try {
        const [status, resposta] = await readUsuario();
        res.status(status).json(resposta);
    } catch (error) {
        res.status(500).json({message:'Erro ao mostrar usurios'})
    }
}

export async function showOneUsuario(id_usuario) {
    console.log('UsuarioModel :: showOneUsuario');

    const conexao = mysql.createPool(db);
    const sql = 'SELECT * FROM usuarios WHERE id_usuario=?';
    const params = [id_usuario];

    try {
        const [retorno] = await conexao.query(sql);
        if(retorno.length < 1){
            return[404, {message:'Usuario não encontrado'}];
        }else{
            return[200,retorno[0]];
        }
    } catch (error) {
        console.log(error)
        return[500, {message: 'Erro ao mostrar usuario'}]
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
            res.status(500).json({message:'Erro ao mostrar um usuário'})
        }
    }

}

export async function findUserByLoginPassword(login,senha) {
    console.log('UsarioModel :: findUserByLoginPassword')

    const conexao = mysql.createPool(db);
    const sql = 'SELECT id_usuario FROM usuarios WHERE login = ? AND senha = ?';
    const params = [login,senha];

    try {
        const [retorno] = await conexao.query(sql,params);
        if(retorno.length < 1){
            return [404, {message:'Usuario ou senha invalidos'}];
        }else{
            return [200, retorno[0]];
        }
    } catch (error) {
        console.log(error)
        return [500,{message:'Erro ao mostrar usuário'}]
    }
}
