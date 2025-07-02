import './MenuLogin.css'
import { useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebaseconfig';

function MenuLogin({setToken}){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro,setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();  
        console.log(email,senha)
        try{
            
            const usuario = await signInWithEmailAndPassword(auth, email, senha);
            const token = await usuario.user.getIdToken();

            const resposta = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({idToken: token}),
            })
            
            if(!resposta.ok){
                const erro = await resposta.json();
                setErro(erro.error || 'Erro ao tentar entrar no servidor');
                return;
            }

            const dados = await resposta.json();
            console.log('Usuário foi aprovado pela rota /login no backend, dados:, ' , dados.user)

            setToken(token);
            setErro('');
            alert('Login foi realizado');


        }
        catch(error){
            console.error('Erro ao relzair o login,', error);
            setErro('Email ou senha inválidos')
        }
    }

    return(
        <div className='login'>
            <form onSubmit={handleLogin} className='forms'>
                <label>Email</label>
                <input type='email'value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label>Senha</label>
                <input type='password' value={senha} onChange={(e) => setSenha(e.target.value)}></input>
                <button type='submit'>Realizar Login</button>
            </form>
            <button>Cadastro</button>

            {erro && <p className='erro'>{erro}</p>}
        </div>
    );

}

export default MenuLogin