import {Swiper, SwiperSlide} from 'swiper/react'
import './SwiperComponente.css'
import 'swiper/css'

function SwiperComponente(props){
    return(
        <Swiper
            style={props.style}
            spaceBetween={20}
            slidesPerView={3}
            
        >
            {props.resultados.map((item) => (
                <SwiperSlide key={item.idMeal} onClick={() => props.clicado(item)}>
                    <img src={item.strMealThumb} alt={item.strMeal} className='img'/>
                </SwiperSlide>
            ))} 

        </Swiper>
    );
}

export default SwiperComponente