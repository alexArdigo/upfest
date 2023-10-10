import './style.scss';
import React, {useContext} from "react";
import {ListBilheteCompact} from "../list_cards_festival";
import {BttnsConfirmarRejeitar} from "../buttons";
import {ContextUser} from "../../ContextUser";


const Confirmation = props => {
    const context = useContext(ContextUser);
    const {name, email} = context;

    return <div className={"Confirmation"}>
        <div className={"overlay"}>
            <div className={"confirmation-content border-squared"}>
                <h1 className={"h1-block-title "}>Confirmação</h1>
                <ListBilheteCompact {...props}/>
                <p>Estás a comprar um bilhete para o festival {props.evento}. Verifica os teus dados e clica em
                    “Confirmar” para gerar uma referência de pagamento.</p>
                <div className={"user-details"}>
                    <div><span>Nome</span></div>
                    <div><span>{name}</span></div>
                    <div><span>Email</span></div>
                    <div><span>{email}</span></div>
                </div>
                <BttnsConfirmarRejeitar {...props}/>
            </div>

        </div>

    </div>;
};

export default Confirmation;