import './style.scss';
import {Link} from "react-router-dom";

const CashlessBoxCard = props => {
    return <>
        <Link to={`/cashless/${props.id_evento}`}>
            <div className={'CashlessCreditBox border-circle'}>
                <div className={"cash no-repeat"}>
                </div>
                <span className={""}>Saldo Cashless</span>
                <span className={""}>
                    {props.saldo !== undefined ? `${props.saldo.toFixed(2)} €` : '0,00 €'}
                </span>
            </div>
        </Link>
    </>;
};

export default CashlessBoxCard;