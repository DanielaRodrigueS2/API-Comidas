import './CardComida.css'

function CardComida(props){
    const item = props.comida
    console.log(item)

    return(
        <div className='card'>
            <img src={item.strMealThumb}/>
            <h2>Nome: {item.strMeal}</h2>
            <h2>Categoria: {item.strCategory}</h2>
            <h2>Area: {item.strArea}</h2>
            <button onClick={() => props.clicado(null)}>Fechar</button>
        </div>
    );

}

export default CardComida