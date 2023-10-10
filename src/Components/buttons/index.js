import './style.scss';


const BttnsConfirmarRejeitar = props => {
    const {handleClick, handleBuyTicket} = props;


    return <>
        <div className={"BttnsConfirmarRejeitar"}>
            <div className={"BttnConfirmar border-circle"} onClick={() => handleBuyTicket(props.id)}>
                <div className={"check"}></div>
                <span>Confirmar</span>
            </div>
            <div className={"BttnRejeitar"} onClick={handleClick}>
                <div className={"reject"}></div>
            </div>
        </div>
    </>;
};

const BttnLeftArrowActive = props => {
    return <>
        <div className={"BttnLeftArrowActive border-circle"}>
            <div className={"arrow"}></div>
        </div>
    </>;
};

const BttnLeftArrowGreyed = props => {
    return <>
        <div className={"BttnLeftArrowGreyed border-circle"}>
            <div className={"arrow"}></div>
        </div>
    </>;
};

const BttnRightArrowActive = props => {
    return <>
        <div className={"BttnRightArrowActive border-circle"}>
            <div className={"arrow"}></div>
        </div>
    </>;
};

const BttnRightArrowGreyed = props => {
    return <>
        <div className={"BttnRightArrowGreyed border-circle"}>
            <div className={"arrow"}></div>
        </div>
    </>;
};

export {
    BttnsConfirmarRejeitar,
    BttnLeftArrowActive,
    BttnLeftArrowGreyed,
    BttnRightArrowActive,
    BttnRightArrowGreyed
};