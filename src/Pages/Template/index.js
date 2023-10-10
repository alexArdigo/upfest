import './style.scss';
import {useEffect, useState} from "react";
import axiosFest from "../../Authentication";


const Nome = props => {
    const [artistas, setArtistas] = useState([]);

    useEffect(() => {
        axiosFest.get(`/evento/listar`,
            {
                params: {
                    apenas_futuros: 1
                }
            }
        )
            .then(resultado => setArtistas(resultado.data.eventos))
            .catch(e => console.log("Erro", e));
    }, []);


    if (!artistas) {
        return null;
    }

    return <>

    </>;
};

export default Nome;