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

export async function showOneUsuario(id_usuario) {
    console.log('UsuarioModel :: showOneUsuario');

    const conexao = mysql.createPool(db);
    const sql = 'SELECT * FROM usuarios WHERE id_usuario=?';
    const params = [id_usuario];

    try {
        const [retorno] = await conexao.query(sql,params);
        if(retorno.length < 1){
            return[404, {message:'Usuario não encontrado'}];
        }else{
            //console.log(retorno);
            return[200,retorno[0]];
        }
    } catch (error) {
        console.log(error)
        return[500, {message: 'Erro ao mostrar usuario'}]
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
