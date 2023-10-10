import './style.scss';
import React, {useContext, useEffect, useState} from "react";
import axiosFest from "../../Authentication";
import {PendingPaymentWarning} from "../../Components/warnings";
import {CardFestivalPurchasedTickets} from "../../Components/cards_images";
import {LogoGreyed} from "../../Components/logo_images";
import {ListFestivalInfoBttn, ListFestivalTicketBttn} from "../../Components/list_cards_festival";
import NavBar from "../../Components/nav_bar";
import {ContextUser} from "../../ContextUser";
import Spinning from "../../Components/spinning";

const Tickets = props => {
    const {name, email} = useContext(ContextUser);
    const [pending, setPending] = useState(false);
    const [eventos, setEventos] = useState(null);
    const [saldo, setSaldo] = useState([]);


    useEffect(() => {
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
                    resultado.data.futuros.map(async (el, idx) => {
                        // LISTAR SALDO CASHLESS
                        await axiosFest.get(`/cashless/${el.id_evento}/saldo`,
                            {
                                params: {
                                    participante: email
                                }
                            })
                            .then(resultado => setSaldo(prev => [...prev || [], resultado.data]))
                            .catch(e => console.log("Erro", e));
                    });
                } catch (error) {
                    console.log('Erro em buscar o saldo cashless', error);
                }
            })
            .catch(e => console.log("Erro", e));
    }, []);

    if (!eventos) {
        return <Spinning/>;
    }
    return <div className={"Tickets"}>
        <NavBar/>
        {pending ? <PendingPaymentWarning/> : null}
        <h1 className={"h1-block-title"}>A decorrer</h1>
        <div>
            {eventos.atuais.length > 0
                ? eventos.atuais.map((el, idx) => {
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
                })
                : <LogoGreyed message={'Sem eventos a decorrer'}/>}
        </div>
        <hr/>
        <div>
            <h1 className={"h1-block-title"}>Em breve</h1>
            <>
                {eventos.futuros.map(el =>
                    <ListFestivalTicketBttn
                        key={el.id}
                        id={el.id}
                        id_evento={el.id_evento}
                        evento={el.evento}
                        data={el.data_evento}
                        local={el.local}
                        imagem={el.imagem_evento}
                    />)}
            </>
        </div>
        <div>
            <h1 className={"h1-block-title"}>Festivais passados</h1>
            <>
                {eventos.passados.map(el =>
                    <ListFestivalInfoBttn
                        key={el.id}
                        id={el.id}
                        id_evento={el.id_evento}
                        evento={el.evento}
                        data={el.data_evento}
                        local={el.local}
                        imagem={el.imagem_evento}
                    />)}
            </>
        </div>
    </div>;
};

export default Tickets;