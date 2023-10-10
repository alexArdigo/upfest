import './style.scss';
import {Link} from "react-router-dom";
import {BttnFavourite, BttnInfo, BttnTicket} from "../icon-buttons";
import {convertDate1, convertDate2} from "../../Functions/DateConverters";
import stringShortener from "../../Functions/StringShortener";


const ListFestivalFavoutireBttn = props => {

    return <div className={'ListFestivalFavoutireBttn border-squared'}>

        <BttnFavourite id={props.id} type={'evento'}/>
        <Link to={`/festival/${props.id}`}>
            <div className={"gradient-to-left"}>
            </div>
            <div className={"bg-mask"}
                 style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
            </div>
            <div className={"info-container-3"}>
                <h1 className={"h1-card-title"}>{stringShortener(props.evento)}</h1>
                <span className={"font-yellow"}>{convertDate1(props.data)}</span>
                <span>{props.local}</span>
            </div>
        </Link>
    </div>;
};

const ListFestivalTicketBttn = props => {
    return <div className={'ListFestivalTicketBttn border-squared'}>
        <BttnTicket/>
        <Link to={`/bought/${props.id_evento}`}>
            <div className={"gradient-to-left"}>
            </div>
            <div className={"bg-mask"}
                 style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
            </div>
            <div className={"info-container-3"}>
                <h1 className={"h1-card-title"}>{stringShortener(props.evento)}</h1>
                <span className={"font-yellow"}>{convertDate1(props.data)}</span>
                <span>{props.local}</span>
            </div>
        </Link>
    </div>;
};

const ListFestivalInfoBttn = props => {
    return <div className={'ListFestivalInfoBttn border-squared'}>
        <BttnInfo/>
        <Link to={`/festival/${props.id_evento}`}>
            <div className={"gradient-to-left"}>
            </div>
            <div className={"bg-mask"}
                 style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
            </div>
            <div className={"info-container-3"}>
                <h1 className={"h1-card-title"}>{stringShortener(props.evento)}</h1>
                <span className={"font-yellow"}>{convertDate2(props.data)}</span>
                <span>{props.local}</span>
            </div>
        </Link>
    </div>;
};

const ListArtist = props => {
    return <div className={'ListArtist border-circle'}>
        <BttnFavourite id={props.id} type={'artista'}/>
        <Link to={`/artist/${props.id}`}>
            <div className={"gradient-to-left"}>
            </div>
            <div className={"bg-mask circle"}
                 style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
            </div>
            <div className={"info-container-3"}>
                <h1 className={"h1-card-title"}>{stringShortener(props.nome)}</h1>
                <span className={"font-yellow"}>Artista</span>
            </div>
        </Link>
    </div>;
};

const ListConcertosDoArtista = props => {
    return <div className={'ListConcerto border-circle'}>
        <BttnFavourite id={props.evento_id} type={'evento'}/>
        <Link to={`/festival/${props.evento_id}`}>
            <div className={"gradient-to-left"}>
            </div>
            <div className={"bg-mask circle"}
                 style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
            </div>
            <div className={"info-container-3"}>
                <h1 className={"h1-card-title"}>{props.evento}</h1>
                <span className={"font-yellow"}>{convertDate1(props.data)}</span>
                <span>{props.palco}</span>
            </div>
        </Link>
    </div>;
};

const ListConcertosDosArtistasNoFestival = props => {
    return <div className={'ListConcerto border-circle'}>
        <BttnFavourite id={props.artista_id} type={'artista'}/>
        <Link to={`/artist/${props.artista_id}`}>
            <div className={"gradient-to-left"}>
            </div>
            <div className={"bg-mask circle"}
                 style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
            </div>
            <div className={"info-container-3"}>
                <h1 className={"h1-card-title"}>{props.artista}</h1>
                <span className={"font-yellow"}>{convertDate1(props.data_hora_inicio)}</span>
                <span>{props.palco}</span>
            </div>
        </Link>
    </div>;
};

const ListBilhete = props => {
    const {handleClick} = props;
    return <>
        {props.limite_vendas !== 'Indisponível'
            ? <div className={'ListBilhete border-circle'}
                   onClick={() => handleClick(
                       {
                           id: props.id,
                           designacao: props.designacao,
                           limite_vendas: props.limite_vendas,
                           custo: props.custo
                       }
                   )}>
                <div className={"container"}>
                    <div className={"gradient-to-left"}>
                    </div>
                    <div className={"bg-mask circle"}>
                        <div className={"ticket-large-active"}>
                        </div>
                    </div>
                    <div className={"info-container-3"}>
                        <h1 className={"h1-card-title"}>{props.designacao}</h1>
                        <span className={"font-yellow"}>
                            {props.limite_vendas}
                        </span>
                    </div>
                    <span
                        className={"box-bg-principal border-squared-small"}>
                        {props.custo !== undefined
                            ? `${props.custo.toFixed(2)} €`
                            : '0,00 €'}
                    </span>
                </div>
            </div>
            : <div className={'ListBilhete unavailable border-circle'}>
                <div className={"container"}>
                    <div className={"gradient-to-left"}>
                    </div>
                    <div className={"bg-mask circle"}>
                        <div className={"ticket-large"}>
                        </div>
                    </div>
                    <div className={"info-container-3"}>
                        <h1 className={"h1-card-title"}>{props.designacao}</h1>
                        <span>{props.limite_vendas}</span>
                    </div>
                    <span
                        className={"box-bg-principal border-squared-small"}>
                        {props.custo !== undefined
                            ? `${props.custo.toFixed(2)} €`
                            : '0,00 €'}
                    </span>
                </div>
            </div>}
    </>;
};

const ListBilheteCompact = props => {

    return <div className={'ListBilheteCompact border-circle'}>
        <div className={"gradient-to-left"}>
        </div>
        <div className={"bg-mask circle"}>
            <div className={"ticket-small-active"}>
            </div>
        </div>
        <div className={"info-container-3"}>
            <h1 className={"h1-card-title"}>
                {props.designacao === 'Primeira Venda'
                    ? 'Early Bird'
                    : props.designacao}
            </h1>
            <span className={"font-yellow"}>{`Até ${props.limite_vendas}`}</span>
        </div>
        <span
            className={"box-bg-principal border-squared-small"}>
            {props.custo !== undefined
                ? `${props.custo.toFixed(2)} €`
                : '0,00 €'}
        </span>
    </div>;
};

export {
    ListFestivalFavoutireBttn,
    ListFestivalTicketBttn,
    ListFestivalInfoBttn,
    ListArtist,
    ListConcertosDoArtista,
    ListConcertosDosArtistasNoFestival,
    ListBilhete,
    ListBilheteCompact
};