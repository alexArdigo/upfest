import './style.scss';
import {FestivalHeaderPicture} from "../../Components/cards_images";
import NavBar from "../../Components/nav_bar";
import {useContext, useEffect, useState} from "react";
import axiosFest from "../../Authentication";
import {ListBilhete, ListConcertosDosArtistasNoFestival} from "../../Components/list_cards_festival";
import {useParams} from "react-router-dom";
import Confirmation from "../../Components/confirmation";
import {ContextUser} from "../../ContextUser";
import {PaymentFailure, PaymentSuccess} from "../../Components/warnings";
import FinalTicketCard from "../../Components/cards_images/FinalTicketCard";
import {convertDate1} from "../../Functions/DateConverters";
import Spinning from "../../Components/spinning";


const Festival = props => {
    const context = useContext(ContextUser);
    const {name, email} = context;
    const {id} = useParams();
    const dataAtual = new Date().toISOString();
    const [evento, setEvento] = useState({});
    const [concertos, setConcertos] = useState(null);
    const [bilhetes, setBilhetes] = useState(null);
    const [modal, setModal] = useState(false);
    const [bilhete, setBilhete] = useState({});
    const [showBannerSuccess, setShowBannerSuccess] = useState(false);
    const [showBannerFailure, setShowBannerFailure] = useState(false);
    const [showTickets, setShowTickets] = useState(true);


    useEffect(() => {
        // LISTAR DETALHES DO EVENTO
        axiosFest.get(`/evento/${id}/detalhes`,
        ).then(result => setEvento(result.data.evento))
            .catch(e => console.log("Erro", e));

        // LISTAR CONCERTOS DO EVENTO
        axiosFest.get(`/evento/${id}/concertos/listar`,
        ).then(result => setConcertos(result.data.concertos))
            .catch(e => console.log("Erro", e));

        // LISTAR AS SERIES DOS BILHETES DO EVENTO
        axiosFest.get(`/evento/${id}/series_bilhetes/listar`,
        ).then(result => setBilhetes(result.data.series))
            .catch(e => console.log("Erro", e));
    }, []);


    if (!evento || !concertos || !bilhetes) {
        return <Spinning/>;
    }

    const handleClick = els => {
        setModal(!modal);
        setBilhete(els);
        window.scrollTo(0, 0);
    };


    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    const handleBuyTicket = serieID => {


        axiosFest.post(`/vendas/bilhetes/comprar`,
            {
                evento: id,
                nome: name,
                email: email,
                serie: serieID
            })
            .then(resultado => {
                if (resultado.data.success) {
                    handleClick();
                    setShowBannerSuccess(true);
                    setShowTickets(false);
                    setTimeout(() => {
                        setShowBannerSuccess(false);
                    }, 5000);
                }
            })
            .catch(e => {
                console.log("Erro", e);
                setShowBannerFailure(true);
                handleClick();
                setTimeout(() => {
                    setShowBannerFailure(false);
                }, 5000);
            });
    };


    return <div className={"Festival"}>
        <NavBar/>
        <FestivalHeaderPicture imagem={evento.imagem} id={evento.id}/>
        <div className={"info-header-festival"}>
            <div className={"info-container-2"}>
                <h1 className={"h1-card-title"}>{evento.designacao}</h1>
                <span className={"font-yellow"}>{convertDate1(evento.data)}</span>
                <span>{evento.local}</span>
            </div>
        </div>
        {!showTickets && (<FinalTicketCard/>)}
        <hr/>
        <h1 className={"h1-block-title"}>Concertos</h1>
        <div>
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
        <h1 className={"h1-block-title"}>Informações</h1>
        <div>
            <p>{evento.descricao}</p>
        </div>
        {showTickets && (<div>
            <h1 className={"h1-block-title"}>Bilhetes</h1>
            {bilhetes.map(el =>
                <ListBilhete
                    key={el.id}
                    id={el.id}
                    designacao={el.designacao === 'Primeira Venda' ? 'Early Bird' : el.designacao}
                    limite_vendas={el.limite_vendas < dataAtual
                        ? 'Indisponível'
                        : convertDate1(el.limite_vendas)}
                    custo={el.custo}
                    handleClick={handleClick}

                />
            )}
        </div>)}
        {modal && (<Confirmation
            {...bilhete}
            evento={evento.designacao}
            modal={modal}
            setModal={setModal}
            handleClick={handleClick}
            handleBuyTicket={handleBuyTicket}
        />)}
        {showBannerSuccess && (<PaymentSuccess/>)}
        {showBannerFailure && (<PaymentFailure/>)}
    </div>;
};

export default Festival;

