import './menuLogin.css'
import { useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../firebaseconfig';

function menuLogin({setToken}){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro,setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefaut();

        try{
            const usuario = await signInWithEmailAndPassword(auth, email, senha);
            const token = await usuario.user.getIdToken();
            
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
            <form onSubmit={handleLogin}>
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

export default menuLogin