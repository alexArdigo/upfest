import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axiosFest from "./Authentication";


const ContextUser = React.createContext({});

const ProviderUser = props => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    let history = useHistory();

    const [favourites, setFavourites] = useState({
        eventos: [],
        artistas: []
    });
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        history.push("/login");
    }, []);


    const toggleFavourites = (type, id) => {

        const types = favourites[`${type}s`];
        axiosFest.post(`/participante/favoritos/toggle_${type}`,
            {
                participante: email,
                [type]: id

            })
            .then(() => {
                if (types.includes(id)) {
                    types.splice(types.indexOf(id), 1);
                } else {
                    types.push(id);
                }

                setFavourites({...favourites});
            })
            .catch(e => console.log("Erro", e));

    };
    useEffect(() => {
        axiosFest.get(`/participante/favoritos/listar`,
            {
                params: {
                    participante: email,
                    apenas_ids: 1
                }
            })
            .then(resultado => setFavourites({
                    eventos: resultado.data.ids_favoritos.eventos,
                    artistas: resultado.data.ids_favoritos.artistas
                })
            )
            .catch(e => console.log("Erro", e));
    }, []);

    if (!favourites) {
        return null;
    }

    const isFavourite = (type, id) => {
        const types = favourites[`${type}s`];
        if (favourites && types) {
            return types.includes(id);
        }
    };


    return <ContextUser.Provider value={{
        name,
        setName,
        email,
        setEmail,
        toggleFavourites,
        favourites,
        isFavourite
    }}>

        {props.children}
    </ContextUser.Provider>;
};

export default ProviderUser;
export {ContextUser};