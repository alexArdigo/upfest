import './style.scss';
import {convertDate2} from "../../Functions/DateConverters";

const ListPaymentComplete = props => {
    return <div className={'ListPaymentComplete border-circle'}>
        <div className={"gradient-to-left"}>
        </div>
        <div className={"bg-mask circle"}>
            <div className={"card_large"}>
            </div>
        </div>
        <div className={"info-container-3"}>
            <h1 className={"h1-card-title"}>{props.tipo}</h1>
            <span className={"font-green"}>Completo</span>
            <span>{convertDate2(props.data_validado)}</span>
        </div>
        <span className={"box-bg-principal border-squared-small"}>
                {props.valor !== undefined ? `${props.valor.toFixed(2)} €` : '0,00 €'}
            </span>
    </div>;
};

const ListPaymentPending = props => {
    return <>
        <div className={'ListPaymentPending border-circle'}>
            <div className={"gradient-to-left"}>
            </div>
            <div className={"bg-mask circle"}>
                <div className={"card_large"}>

                </div>
            </div>
            <div className={"info-container-3"}>
                <h1 className={"h1-card-title"}>Pagamento</h1>
                <span className={"font-yellow"}>Pendente</span>
                <span>{convertDate2(props.data_compra)}</span>

            </div>
            <span className={"box-bg-principal border-squared-small"}>
                {props.valor !== undefined ? `${props.valor.toFixed(2)} €` : '0,00 €'}
            </span>
        </div>

        <div className={"Payment-ref-box border-squared"}>
            <div><span>Entidade</span></div>
            <div><span>{props.entidade}</span></div>
            <div><span>Referência</span></div>
            <div><span>{props.referencia}</span></div>
            <div><span>Valor</span></div>
            <div>
                <span>{props.valor !== undefined ? `${props.valor.toFixed(2)} €` : '0,00 €'}</span>
            </div>
        </div>
    </>;
};

export {ListPaymentComplete, ListPaymentPending};