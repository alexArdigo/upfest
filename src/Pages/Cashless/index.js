import './style.scss';
import React, {useContext, useEffect, useState} from "react";
import axiosFest from "../../Authentication";
import NavBar from "../../Components/nav_bar";
import {PaymentFailure, PaymentSuccess, PendingPaymentWarning} from "../../Components/warnings";
import CurrentBalance from "../../Components/current_balance";
import TopUpForm from "../../Components/top_up_form";
import {ListMovementTopUp} from "../../Components/list_cards_movements";
import {useLocation, useParams} from "react-router-dom";
import {LogoGreyed} from "../../Components/logo_images";
import {ContextUser} from "../../ContextUser";
import Pagination from "../Pagination";
import Spinning from "../../Components/spinning";


const Cashless = props => {
    const {name, email} = useContext(ContextUser);
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);
    const {id_evento} = useParams();
    const [pending, setPending] = useState(true);
    const [balance, setBalance] = useState(0);
    const [statement, setStatement] = useState([]);
    const [showBannerSuccess, setShowBannerSuccess] = useState(false);
    const [showBannerFailure, setShowBannerFailure] = useState(false);

    // PAGINAÇÃO
    const [pagina, setPagina] = useState(0);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    const por_pagina = 4;


    useEffect(() => {
        setIsActive(location.pathname.split(/[^a-z]/).join('') === 'cashless');
    }, [location]);

    useEffect(() => {

        // GET PENDING
        axiosFest.get(`/participante/pagamentos/existem_pendentes`,
            {
                params: {
                    participante: email
                }
            }
        )
            .then(resultado => setPending(resultado.data.existem_pendentes))
            .catch(e => console.log("Erro", e));

        axiosFest.get(`/cashless/${id_evento}/saldo`,
            {
                params: {
                    participante: email
                }
            }
        )
            .then(resultado => setBalance(resultado.data.saldo))
            .catch(e => console.log("Erro", e));

        axiosFest.get(`/cashless/${id_evento}/extrato`,
            {
                params: {
                    participante: email
                }
            }
        )
            .then(resultado => {
                setNumeroPaginas(Math.ceil(resultado.data.movimentos.length / por_pagina));
                return resultado.data.movimentos.length > 0
                    ? setStatement(prev => [...(prev || []), resultado.data.movimentos])
                    : statement;
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log('Participante não encontrado ou não registado neste evento.');
                    setStatement([]);
                } else {
                    console.log('Error:', error);
                }
            });
    }, []);

    if (!statement) {
        return <Spinning/>;
    }


    const primeiro_index = pagina * por_pagina;
    const ultimo_index = (pagina + 1) * por_pagina;
    const movimento_pagina = statement.flat().slice(primeiro_index, ultimo_index);


    return <div className={"Cashless"}>
        <NavBar/>
        <div className={`nav-bar-item ${isActive ? 'user-active' : ''}`}></div>
        {pending ? <PendingPaymentWarning/> : null}
        <CurrentBalance saldo={balance}/>
        <div className={"top-up"}>
            <h1 className={"h1-block-title"}>Efectuar carregamento</h1>
            <TopUpForm
                id_evento={id_evento}
                setShowBannerSuccess={setShowBannerSuccess}
                setShowBannerFailure={setShowBannerFailure}
            />
        </div>
        <div className={"movements"}>
            <h1 className={"h1-block-title"}>Movimentos</h1>
            {statement.length <= 0
                ? <LogoGreyed message={'Sem movimentos'}/>
                : <ListMovementTopUp statement={movimento_pagina}/>
            }
        </div>
        <Pagination pagina={pagina}
                    setPagina={setPagina}
                    numeroPaginas={numeroPaginas}
                    single_page={numeroPaginas <= 0}

        />
        {showBannerSuccess && (<PaymentSuccess/>)}
        {showBannerFailure && (<PaymentFailure/>)}
    </div>;
};

export default Cashless;