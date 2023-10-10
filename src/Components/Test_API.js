import {useEffect, useState} from "react";
import axiosFest from "../Authentication";


const TestAPI = props => {
    const [artista, setArtista] = useState("Artista");


    useEffect(() => {
        axiosFest.get("/artistas/listar",
            {
                params: {
                    pagina: 0,
                    numero_resultados: 3
                }
            }
        )
            .then(resultado => setArtista(resultado.data))
            .catch(e => console.log("Erro", e)
            );
    }, []);


    if (!artista) {
        return null;
    }


    return <div>
        {artista}
    </div>;
};

export default TestAPI;
