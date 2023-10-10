import './style.scss';
import React, {useContext, useEffect, useState} from "react";
import axiosFest from "../../Authentication";
import {ContextUser} from "../../ContextUser";
import Spinning from "../../Components/spinning";
import {useParams} from "react-router-dom";
import NavBar from "../../Components/nav_bar";
import {PendingPaymentWarning} from "../../Components/warnings";
import {CardFestivalPurchasedTickets} from "../../Components/cards_images";
import {ListConcertosDosArtistasNoFestival} from "../../Components/list_cards_festival";


const TicketBought = props => {
    const {email} = useContext(ContextUser);
    const {id_evento} = useParams();
    const [eventos, setEventos] = useState(null);
    const [concertos, setConcertos] = useState([]);
    const [saldo, setSaldo] = useState([]);
    const [descricaoEvento, setDescricaoEvento] = useState('');
    const [pending, setPending] = useState(true);


    useEffect(() => {

        // GET PENDING
        axiosFest.get(`/participante/pagamentos/existem_pendentes`,
            {
                params: {
                    participante: email
                }
            }
        )
            .then(resultado => setPending(resultado.data.existem_pendentes))
            .catch(e => console.log("Erro", e));


    }, []);

    useEffect(() => {
        axiosFest.get(`/participante/bilhetes/listar`,
            {
                params: {
                    participante: email,
                    apenas_ids: 1
                }
            }
        )
            .then(resultado => {
                setEventos(resultado.data);

                try {
                    // LISTAR SALDO CASHLESS
                    axiosFest.get(`/cashless/${id_evento}/saldo`,
                        {
                            params: {
                                participante: email
                            }
                        })
                        .then(resultado => setSaldo(prev => [...prev || [], resultado.data]))
                        .catch(e => console.log("Erro", e));

                } catch (error) {
                    console.log('Erro em buscar o saldo cashless', error);
                }
            })
            .catch(e => console.log("Erro", e));


        axiosFest.get(`/evento/${id_evento}/detalhes`,
            {
                params: {
                    participante: email
                }
            }
        ).then(resultado => setDescricaoEvento(resultado.data.evento.descricao)
        ).catch(e => console.log("Erro", e));


        // LISTAR CONCERTOS DO EVENTO
        axiosFest.get(`/evento/${id_evento}/concertos/listar`,
        ).then(result => setConcertos(result.data.concertos))
            .catch(e => console.log("Erro", e));

    }, []);

    if (!eventos || !descricaoEvento || !concertos) {
        return <Spinning/>;
    }
    return <>
        <div className={"Tickets"}>
            <NavBar/>
            {pending ? <PendingPaymentWarning/> : null}
            <div>
                {eventos.futuros.length > 0
                    && eventos.futuros.map((el, idx) => {
                        if (el.id_evento === parseInt(id_evento)) {
                            return <CardFestivalPurchasedTickets
                                key={el.id}
                                id={el.id}
                                evento={el.evento}
                                id_evento={el.id_evento}
                                data_evento={el.data_evento}
                                local={el.local}
                                imagem_evento={el.imagem_evento}
                                saldo={saldo[idx]?.saldo}
                            />;
                        }
                    })
                }
            </div>
            <hr/>
            <div className={"Concertos"}>
                <h1 className={"h1-block-title"}>Concertos</h1>
                {concertos.map(el =>
                    <ListConcertosDosArtistasNoFestival
                        key={el.id}
                        artista={el.artista}
                        artista_id={el.artista_id}
                        data_hora_inicio={el.data_hora_inicio}
                        imagem={el.imagem}
                        palco={el.palco}
                    />
                )}
            </div>
            <hr/>
            <div className={"descricao"}>
                <h1 className={"h1-block-title"}>Informações</h1>
                <p>
                    {descricaoEvento}
                </p>

            </div>
        </div>
    </>;
};

export default TicketBought;