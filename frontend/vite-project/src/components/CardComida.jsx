import './CardComida.css'

function CardComida(props){
    const item = props.comida
    console.log(item)

    return(
        <div className='card'>
            <img src='../../public/comida.jpg'/>
            <h2>Nome: {item.nome}</h2>
            <h2>Categoria: {item.tipo}</h2>
            <h2>Area: {item.area}</h2>
            <button onClick={() => props.clicado(null)}>Fechar</button>
        </div>
    );

}

export default CardComida