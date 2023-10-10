import './style.scss';


const PendingPaymentWarning = props => {
    return <>
        <div className={"PendingPaymentWarning border-circle"}>
            <span>Existem pagamentos pendentes na tua conta</span>
        </div>
    </>;
};

const TopUpSuccess = props => {
    return <>
        <div className={"PaymentSuccess"}>
            <div className={"success-message"}>
                <span>Carregamento registado com sucesso,</span>
                <span>tens um novo pagamento pendente</span>
            </div>
            <div className={"check"}></div>
        </div>
    </>;
};

const PaymentSuccess = props => {
    return <>
        <div className={"PaymentSuccess"}>
            <div className={"success-message"}>
                <span>Compra registada com sucesso</span>
            </div>
            <div className={"check"}></div>
        </div>
    </>;
};

const PaymentFailure = props => {
    return <>
        <div className={"PaymentFailure"}>
            <div className={"failure-message"}>
                <span>Ocorreu um erro ao registar a compra</span>
            </div>
            <div className={"warning-white"}></div>
        </div>
    </>;
};

export {PendingPaymentWarning, TopUpSuccess, PaymentSuccess, PaymentFailure};