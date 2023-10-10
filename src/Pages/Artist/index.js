import './style.scss';
import {ArtistHeaderPicture} from "../../Components/cards_images";
import React, {useEffect, useState} from "react";
import axiosFest from "../../Authentication";
import {ListConcertosDoArtista} from "../../Components/list_cards_festival";
import NavBar from "../../Components/nav_bar";
import {useParams} from "react-router-dom";
import Spinning from "../../Components/spinning";


const Artist = props => {
    const {id} = useParams();
    const [artist, setArtist] = useState(null);
    const [concerts, setConcerts] = useState(null);

    useEffect(() => {
        axiosFest.get(`/artistas/${id}/detalhes`,
        ).then(resultado => setArtist(resultado.data.artista))
            .catch(e => console.log("Erro", e));

        axiosFest.get(`/artistas/${id}/concertos`,
            {
                params: {
                    pagina: 0,
                    numero_resultados: 3
                }
            }
        )
            .then(resultado => setConcerts(resultado.data.concertos))
            .catch(e => console.log("Erro", e));
    }, []);


    if (!artist || !concerts) {
        return <Spinning/>;
    }

    return <div className={"Artists"}>
        <NavBar/>
        <ArtistHeaderPicture nome={artist.nome} imagem={artist.imagem} id={artist.id}/>
        <div className={"artists-container"}>
            <h1 className={"h1-block-title"}>Próximos concertos</h1>
            <>
                {concerts.map(el =>
                    <ListConcertosDoArtista
                        key={el.id}
                        evento_id={el.evento_id}
                        evento={el.evento}
                        data={el.data_hora_inicio}
                        palco={el.palco}
                        imagem={el.imagem}
                    />)}
            </>
            <div>
                <h1 className={"h1-block-title"}>Sobre</h1>
                <p>{artist.biografia}</p>
            </div>
        </div>
    </div>;
};

export default Artist;