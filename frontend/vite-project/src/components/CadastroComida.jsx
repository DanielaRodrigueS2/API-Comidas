import './CadastroComida.css'
import { useState } from 'react';

function CadastroComida({ onclose }){
    
    const [area, setArea] = useState('');
    const [ingrediente, setIngrediente] = useState('');
    const [nome, setNome] = useState('')
    const [preparo, setPreparo] = useState('')
    const [tipo, setTipo] = useState('')

    const [listaIngredientes, setListaIngredientes] = useState([])
    

    const adicionaIngrediente = (e) =>{
        e.preventDefault();
        if (ingrediente.trim() !== ''){
            setListaIngredientes(prev => [...prev, ingrediente.trim()]);
            setIngrediente('')
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const dados = {
            area: area.trim().toLowerCase(),
            nome: nome.trim(),
            preparo: preparo.trim(),
            tipo: tipo.trim().toLowerCase(),
            ingrediente: listaIngredientes.map(i => i.trim().toLowerCase())
        };

        const token = localStorage.getItem('token')

        try{
            
            const response = await fetch('http://localhost:3000/comidas', {method: 'POST', 
                headers:{'Content-type' : 'application/json',
                    'authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dados)
            })

            if(response.ok){
                alert('Comida foi cadastrada com sucesso :p');
                setArea('');
                setIngrediente('');
                setListaIngredientes([]);
                setNome('');
                setPreparo('');
                setTipo('')
            }
            else{
                const erro = await response.json();
                alert('Erro ao cadastrar comida: '+ erro.error)
            }

        }
        catch(error){
            console.error('Err: ', error);
            alert('Houve algum erro ao tentar cadastrar essa comida')
        }
    }


    return(
        <div className='card'>
            <button className='Fechar' onClick={onclose}>X</button>
            <form onSubmit={handleSubmit} className='forms'>
                <label>Nome</label>
                <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} ></input>
                <label>Area</label>
                <input type='text' value={area} onChange={(e) => setArea(e.target.value)} ></input>
                <label>Preparo</label>
                <input type='text' value={preparo} onChange={(e) => setPreparo(e.target.value)} ></input>
                <label>Tipo</label>
                <input type='text' value={tipo} onChange={(e) => setTipo(e.target.value)} ></input>
                <div className='ingredientes' >
                    <label>Ingredientes</label>
                    <input type='text' value={ingrediente} onChange={(e) => setIngrediente(e.target.value)}></input>
                    <button type='button' onClick={adicionaIngrediente}>Adicionar Ingrediente</button>
                </div>
                <button type='submit'>Cadastrar</button>

            </form>
        </div>
    );

}

export default CadastroComida