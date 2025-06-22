import {createContext, useState } from "react";

export const ContextoTema = createContext()

export function AlteraFundo({children}){
    const [tema, setTema] = useState('Normal')

    function trocarTema(){
        setTema((prevTema) => (prevTema === 'Normal' ? 'Reverso' : 'Normal')) //Troca o tema para o contrário do atual
    }

    return(
        <ContextoTema.Provider value={{tema, trocarTema}}>
            {children}
        </ContextoTema.Provider>

    );
}