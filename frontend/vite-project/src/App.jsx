
import { useReducer , useEffect, useState, useContext} from 'react'
import {useForm} from 'react-hook-form'
import './App.css'
import SwiperComponente from './components/SwiperComponente'
import { ContextoTema} from './contexts/ContextoTema'
import CardComida from './components/CardComida'
import MenuLogin from './components/MenuLogin'
import CadastroComida from './components/CadastroComida'

const URL_API = "http://localhost:3000"

// Armazena o Tipo de pesquisa e seu valor correpondente, armazena os resultados, erros e status
const estadoInicial = {

  filtros:{
    Tipo: '',
    Valor: '',
  },
  resultados: [],
  status: 'inical',
  erro: null,

}

// Reducer pra gerenciar o estado inicial
const reducer =  (state, action) =>{
  switch (action.type) {

    case 'SET_FILTROS':
      return{
        ...state,
        filtros : action.payload,
      };

    case 'SET_RESULTADOS':
      return{
        ...state,
        resultados: action.payload,
        status: 'sucesso',
        erro: null
      };

    case 'SET_CARREGANDO':
      return{
        ...state,
        status: 'carregando'
      };

    case 'SET_ERRO':
      return{
        ...state,
        erro: action.payload,
        status: 'erro'
      };
  
    default:
      return state;

  }

}

function App() {

  //visibilidade do menu de cadastrar comidas
  const [mostrarMenuComida, setMostrarMenuComida] = useState(false)

  // token 
  const [token, setToken] = useState(null)

  // Tema do use Context
  const {tema, trocarTema} = useContext(ContextoTema)

  //Id da comida/item clicado
  const [item, setItem] = useState(null)

  //Dados da comida clicada
  const [comida, setComida] = useState(null)
  
  const [state, dispatch] = useReducer(reducer, estadoInicial)
  const {register,handleSubmit,watch, setValue,} = useForm({
    defaultValues : {
      Tipo: '',
      Valor: '',
    }
  })

  const [listas, setListas] = useState({
    ingredientes: [],
    categorias: [],
    locais: []
  })

  const watchTipo = watch('Tipo')
  console.log('Tipo selecionado:', watchTipo)

  const onSubmit = (data) => {
    dispatch({type: 'SET_FILTROS', payload: data})
  }

  // Coletar todos os ingredientes, categorias e locais/areas disponiveis para filtro de comidas
  useEffect(() =>{
    if(!token) return;
    console.log('token: ',token)
    const carregarListas = async () =>{
      try{
        const [ingredientes, categorias, locais] = await Promise.all([
          fetch(`${URL_API}/comidas/ingrediente`, {headers: {'authorization': `Bearer ${token}` }}),
          fetch(`${URL_API}/comidas/tipo`, {headers: {'authorization': `Bearer ${token}` }}),
          fetch(`${URL_API}/comidas/area`, {headers: {'authorization': `Bearer ${token}` }}),
        ])

        const [ingredientesJSON, categoriasJSON, locaisJSON] = await Promise.all([
          ingredientes.json(),
          categorias.json(),
          locais.json()
        ])

        setListas({ingredientes : ingredientesJSON,
          categorias : categoriasJSON,
          locais : locaisJSON
        })
      
      }
      catch(error){

        console.log('Erro ao carregar listas', error)
      }
    }
    carregarListas()

  }, [token]) 

  // Função responsável por buscar os valores dependendo do tipo e valor
  const comunicacao = async () =>{
    dispatch({type: 'SET_CARREGANDO'})
    try{

      let url  = ''

      if(state.filtros.Tipo == 'Ingrediente Principal'){
        url = `${URL_API}/comidas/ingrediente/${state.filtros.Valor}`
      }
      else if(state.filtros.Tipo == 'Categoria'){
        url = `${URL_API}/comidas/tipo/${state.filtros.Valor}`
      }
      else if(state.filtros.Tipo == 'Local'){
        url = `${URL_API}/comidas/area/${state.filtros.Valor}`
      }

      if (!url) return;

      const resposta = await fetch(url, {headers: {'authorization': `Bearer ${token}`}})
      const json = await resposta.json()
      dispatch({type: 'SET_RESULTADOS', payload: json || []})

    }
    catch(error){

      dispatch({type: 'SET_ERRO', payload: error.message})
      console.log(state.erro)

    }

  }

  //Função para retornar dados de uma comida especifica
  useEffect(() => {

    if (!item) return;

    const resgataComida = async () => {
      try{

        const url = `${URL_API}/comidas/${item.id}`
        const resposta = await fetch(url, {headers: {'authorization': `Bearer ${token}`}})
        const json = await resposta.json()
        setComida(json)
        console.log('Comida: ',comida)

      }
      catch(error){
        console.log('Erro ao carregaara/ buscar comida', error)
      }

    }
    resgataComida()

  }, [item])

  // Chama a comunicação() quando os filtros são alterados
  useEffect(() =>{

    if(state.filtros.Valor && state.filtros.Tipo) {
      comunicacao();
    }

  },[state.filtros])

  //Apenas para testes
  useEffect(() =>{
    console.log(listas);
  }, [listas])

  useEffect(() =>{
    console.log(state.resultados)
  }, [state.resultados])

  // armazenar token
  useEffect(() =>{
    console.log(token) //teste
    const tokenNoStorage = localStorage.getItem('token');
    if (tokenNoStorage){
      setToken(tokenNoStorage);
    }
  }, [])

  const handleSetToken = (token) =>{
    localStorage.setItem('token', token);
    setToken(token)
  }

  const funcaoSair = () =>{
    localStorage.removeItem('token');
    setToken(null);
  }
  
  //Se não houver token, aparece a tela de login
  if(!token){
    return <MenuLogin setToken={handleSetToken} />
  }

  return (

    <div className={`geral ${tema === 'Normal' ? 'normal' : 'reverso'}`}>
      <div className='header'>
        <form onSubmit={handleSubmit(onSubmit)}> 
          <select {...register('Tipo')}>
            <option value=''>Selecione um tipo de busca</option>
            <option value='Ingrediente Principal'>Ingrediente Principal</option>
            <option value='Categoria'>Categoria</option>
            <option value='Local'>Local</option>
          </select>

          <select {...register('Valor', {required: true})}>
            <option value=''>Selecione o filtro</option>
            {watchTipo === 'Ingrediente Principal' && Array.isArray(listas.ingredientes) && listas.ingredientes.map((item) => (<option key={item} value={item}>{item}</option>))}
            {watchTipo === 'Categoria' && Array.isArray(listas.categorias) && listas.categorias.map((item) => (<option key={item} value={item}>{item}</option>))}
            {watchTipo === 'Local' && Array.isArray(listas.locais) && listas.locais.map((item) => (<option key={item} value={item}>{item}</option>))}
          </select>

          <input type='submit'/>

        </form>

        <button onClick={trocarTema} className='BotaoTroca'>
            Trocar Tema (Atual: {tema})
        </button>

        <button onClick={funcaoSair}>Deslogar</button>
      </div>

      <div className='main'>
        {state.resultados.length > 0 && <SwiperComponente clicado={setItem} resultados={state.resultados} style={{width: '80%', height: '80%'}}></SwiperComponente>}
      </div>

      <button onClick={() => setMostrarMenuComida(true)}>Cadastrar Comidinha</button>

      {mostrarMenuComida && <CadastroComida onclose={() => setMostrarMenuComida(false)}></CadastroComida>}
      {item != null && comida && <CardComida clicado={setItem} comida={comida}></CardComida>}

    </div>
  )

}

export default App
