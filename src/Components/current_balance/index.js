import './style.scss';

const CurrentBalance = props => {
    return <div className={"CurrentBalance"}>
        <span className={"balance"}>{props.saldo !== undefined ? `${props.saldo.toFixed(2)} €` : '0,00 €'}</span>
        <h2>Saldo Atual</h2>
    </div>;
};

export default CurrentBalance;