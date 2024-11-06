import React, { useEffect, useState } from 'react';

function GestaoImagem() {
    const [imagens, setImagens] = useState([]);
    const [imagem, setImagem] = useState(null);
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        carregarImagens()
    }, []);

    async function cadastrarImagens(){
        const formData = new FormData();
        formData.append('descricao', descricao);
        formData.append('imagem',imagem);

        try{
            const resposta = await fetch('http://localhost:5000/imagem',{
                method: 'POST',
                body: formData
            })

            if(!resposta){
                throw new Error('Erro ao cadastrar imagem');
            }else{
                carregarImagens();
            }
        }catch(error){
            throw new Error('Erro ao cadastrar imagem', error);
        }
    }
    async function carregarImagens() {
        try {
            const resposta = await fetch('http://localhost:5000/imagem', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta) {
                throw new Error('Erro ao buscar imagens');
            }
            const consulta = await resposta.json();
            setImagens(consulta);
        } catch (error) {
            console.log('Erro ao buscar imagens', error)
        }
    }

    async function deletarImagem(id_imagens) {
        try {
            const resposta = await fetch(`http://localhost:5000/imagem/${id_imagens}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!resposta.ok) {
                const error = await resposta.json();
                throw new Error('Erro ao deletar imagem', error);
            } else {
                setImagens(imagens.filter(imagem => imagem.id_imagens !== id_imagens));
            }
        } catch (error) {
            throw new Error("Erro ao deletar imagem", error)
        }

    }
    return (
        <>
            <div>
                <nav className='container'>
                    <span>Logo</span>
                    <ul>
                        <li>Inicio</li>
                    </ul>
                </nav>
            </div>
            <div className='container'>
                <h1 className='text-center'>Gestão imagens</h1>
                <div>
                    <h2>Cadastrar imagens</h2>
                    <label htmlFor="">Descrição</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={descricao} 
                        onChange={e=>(setDescricao(e.target.value))} />
                    <label htmlFor="">Imagem</label>
                    <input 
                        className='form-control' 
                        type="file"
                        onChange={e=>(setImagem(e.target.files[0]))}
                        name="" id=""/>
                    <button className="btn btn-succes" onClick={cadastrarImagens}>Cadastrar</button>
                </div>
                <div className='row mt-2'>
                    {imagens.map((imagem) => (
                        <div className='col-md-3' key={imagem.id_imagens}>
                            <img className='img-thumbnail' src={`http://localhost:5000/public/${imagem.caminho}`} alt={imagem.descricao} />
                            <button className='btn btn-primary'>Editar</button>
                            <button className='btn btn-danger float-end' onClick={() => deletarImagem(imagem.id_imagens)}>Deletar</button>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

export default GestaoImagem