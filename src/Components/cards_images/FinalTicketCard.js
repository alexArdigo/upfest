import './style.scss';

const FinalTicketCard = props => {
    return <>
        <div className={'FinalPurchaseBox border-circle'}>
            <div className={"ticket-small-active no-repeat"}>
            </div>
            <span className={""}>1 x {props.serie || 'Bilhete'}</span>
            <div className={"qr no-repeat"}>
            </div>
        </div>
    </>;
};

export default FinalTicketCard;