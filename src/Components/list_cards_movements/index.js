import './style.scss';
import {convertDate3} from "../../Functions/DateConverters";


const ListMovementTopUp = props => {

    return props.statement.map(el => {
            return el.tipo === 'carregamento'
                ? <div className={'ListMovementTopUp border-circle'}>
                    <div className={"gradient-to-left"}>
                    </div>
                    <div className={"bg-mask circle"}>
                        <div className={"card_small"}>
                        </div>
                    </div>
                    <div className={"info-container-3"}>
                        <h1 className={"h1-card-title font-green"}>
                            {el.valor !== undefined ? `+ ${el.valor.toFixed(2)} €` : '0,00 €'}
                        </h1>
                        <span className={""}>{convertDate3(el.data) || null}</span>
                    </div>
                    <span
                        className={"box-bg-principal border-squared-small"}>
            {el.saldo !== undefined ? `${el.saldo.toFixed(2)} €` : '0,00 €'}
                </span>
                </div>
                : <>
                    <div className={'ListMovementSpent border-circle'}>
                        <div className={"gradient-to-left"}>
                        </div>
                        <div className={"bg-mask circle"}>
                            <div className={"shopping-bag"}>
                            </div>
                        </div>
                        <div className={"info-container-3"}>
                            <h1 className={"h1-card-title font-yellow"}>
                                {el.valor_unitario !== undefined
                                || el.quantidade !== undefined
                                    ? `- ${(el.valor_unitario * el.quantidade).toFixed(2)} €`
                                    : '0,00 €'}
                            </h1>
                            <span className={""}>{convertDate3(el.data)}</span>
                        </div>
                        <span className={"box-bg-principal border-squared-small"}>
                           {el.saldo !== undefined ? `${el.saldo.toFixed(2)} €` : '0,00 €'}
                             </span>
                    </div>
                    <div className={'ListMovementSpentBox border-circle'}>
                        <span className={""}>{`${el.quantidade} x ${el.produto.toUpperCase()}`}</span>
                        <span className={""}>
                                {el.valor_unitario !== undefined ? `Valor unit. ${el.valor_unitario}€` : '0€'}
                                  </span>
                    </div>
                </>;
        }
    );
};


export {ListMovementTopUp};