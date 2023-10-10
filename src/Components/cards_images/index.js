import './style.scss';
import {BttnFavourite, BttnTicket} from "../icon-buttons";
import {Link} from "react-router-dom";
import FinalTicketCard from "./FinalTicketCard";
import {convertDate1} from "../../Functions/DateConverters";
import CashlessBoxCard from "./CashlessBoxCard";
import stringShortener from "../../Functions/StringShortener";


const CardFestival = props => {
    return <div className={'CardFestival border-squared'}
                style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
        <BttnFavourite id={props.id} id={props.id} type={'evento'}/>
        <Link to={`/festival/${props.id}`}>
            <div className={'gradient-to-top-half'}>
            </div>
            <div className={'info-container-2'}>
                <h1 className={"h1-card-title"}>{props.designacao}</h1>
                <span className={"font-yellow"}>{convertDate1(props.data)}</span>
                <span className={"middle-item"}>{props.local}</span>
                <span className={"box-bg-principal border-squared-small"}>
                {props.preco_desde ? `${props.preco_desde} €` : 'esgotado'}
            </span>
            </div>
        </Link>
    </div>;

};

const CardFestivalPurchasedHomePage = props => {
    // Card image
    return <>
        <div className={'CardFestivalPurchasedHomePage border-squared'}
             style={{backgroundImage: `url(https://upfest.site/public/${props.imagem_evento})`}}>
            <div className={'gradient-to-top'}></div>
            <hr className={'dashed-line'}/>
            <div className={'info-container-1'}>
                <span className={"box-bg-yellow border-squared-small"}>a acontecer</span>
                <div className={"info-lower"}>
                    <h1 className={"h1-card-title"}>{stringShortener(props.evento)}</h1>
                    <span className={"font-yellow"}>{convertDate1(props.data_evento)}</span>
                    <span className={"middle-item"}>{props.local}</span>
                </div>
            </div>
            <BttnTicket/>
        </div>

        {/* Ticket box */}
        <FinalTicketCard {...props}/>

        {/* Cashless box */}
        <CashlessBoxCard id_evento={props.id_evento} saldo={props.saldo}/>
    </>;
};

const CardFestivalPurchasedTickets = props => {
    // Card image
    return <>
        <div className={'CardFestivalPurchasedTickets border-squared'}
             style={{backgroundImage: `url(https://upfest.site/public/${props.imagem_evento})`}}>
            <div className={'gradient-to-top'}></div>
            <hr className={'dashed-line'}/>
            <div className={'info-container-1'}>
                <div className={"info-lower"}>
                    <h1 className={"h1-card-title"}>{stringShortener(props.evento)}</h1>
                    <span className={"font-yellow"}>{convertDate1(props.data_evento)}</span>
                    <span className={"middle-item"}>{props.local}</span>
                </div>
            </div>
        </div>

        {/* Ticket box */}
        <FinalTicketCard  {...props}/>

        {/* Cashless box */}
        <CashlessBoxCard id_evento={props.id_evento} saldo={props.saldo}/>
    </>;
};

const FestivalHeaderPicture = props => {
    return <div className={'FestivalHeaderPicture border-squared'}
                style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
        <BttnFavourite id={props.id} type={'evento'}/>
        <div className={'gradient-to-top-half'}>
        </div>
    </div>;
};

const ArtistHeaderPicture = props => {
    return <div className={"ArtistHeaderPicture"}>
        <div className={"header-box"}>
            <div className={"bg-artist-picture"}
                 style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
                <div className={"gradient-to-left"}></div>
            </div>
            <div className={"picture-title"}>
                <div className={"artist-picture-box circle"}
                     style={{backgroundImage: `url(https://upfest.site/public/${props.imagem})`}}>
                </div>
                <div className={"info-container-3"}>
                    <h1 className={"h1-card-title"}>{props.nome}</h1>
                    <span className={"font-yellow"}>Artista</span>
                </div>
            </div>

            <BttnFavourite id={props.id} type={'artista'}/>
        </div>
    </div>;
};

export {
    CardFestival,
    CardFestivalPurchasedHomePage,
    CardFestivalPurchasedTickets,
    FestivalHeaderPicture,
    ArtistHeaderPicture
};