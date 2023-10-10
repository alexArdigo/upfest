import './style.scss';
import React, {useContext, useEffect, useState} from "react";
import axiosFest from "../../Authentication";
import {PendingPaymentWarning} from "../../Components/warnings";
import {ListArtist, ListFestivalFavoutireBttn} from "../../Components/list_cards_festival";
import {LogoGreyed} from "../../Components/logo_images";
import {ListPaymentComplete, ListPaymentPending} from "../../Components/list_cards_payments";
import NavBar from "../../Components/nav_bar";
import Pagination from "../Pagination";
import {ContextUser} from "../../ContextUser";
import Spinning from "../../Components/spinning";


const Personal = props => {
    const {email, favourites: favoritosContext} = useContext(ContextUser);
    const [pending, setPending] = useState(true);
    const [pendingList, setPendingList] = useState([]);
    const [payedList, setPayedList] = useState(null);
    const [favourites, setFavourites] = useState(null);


    // PAGINAÇÃO
    //  favoritos:
    const [paginaFavourites, setPaginaFavourites] = useState(0);

    //  outros pagamentos:
    const [paginaPayed, setPaginaPayed] = useState(0);
    const [numeroPaginasPayed, setNumeroPaginasPayed] = useState(0);
    const [totalPaginasPayed, setTotalPaginasPayed] = useState(0);

    const [numero_resultados, setNumero_resultados] = useState(3);


    useEffect(() => {

        // GET PENDING - BOOLEAN
        axiosFest.get(`/participante/pagamentos/existem_pendentes`,
            {
                params: {
                    participante: email
                }
            }
        )
            .then(resultado => {
                setPending(resultado.data.existem_pendentes);
                if (resultado.data.existem_pendentes) {
                    axiosFest.get(`/participante/pagamentos/listar`,
                        {
                            params: {
                                participante: email,
                                estado: "PAGAMENTO_PENDENTE"
                            }
                        }
                    )
                        .then(resultado => setPendingList(resultado.data.pagamentos))
                        .catch(e => console.log("Erro", e));
                }
            })
            .catch(e => console.log("Erro", e));

    }, []);


    useEffect(() => {

        // GET PAYMENTS
        axiosFest.get(`/participante/pagamentos/listar`,
            {
                params: {
                    participante: email,
                    estado: "PAGO",
                    pagina: paginaPayed
                }
            }
        )
            .then(resultado => {
                setPayedList(resultado.data);

                // PAGINAÇÃO - outros pagamentos
                setPaginaPayed(resultado.data.paginacao.pagina);
                setNumeroPaginasPayed(resultado.data.paginacao.paginas);
                setTotalPaginasPayed(resultado.data.paginacao.resultados);
            })
            .catch(e => console.log("Erro", e));
    }, [paginaPayed]);

    useEffect(() => {
        // FAVORITOS
        axiosFest.get(`/participante/favoritos/listar`,
            {
                params: {
                    participante: email,
                    pagina: paginaFavourites
                }
            }
        )
            .then(resultado => {
                setFavourites(resultado.data);
            })
            .catch(e => console.log("Erro", e));

    }, [favoritosContext]);


    if (!favourites || !payedList) {
        return <Spinning/>;
    }
    const handleFavorites = () => {
        return (
            <>
                {favourites.favoritos.map((el) => (
                    el.tipo === "evento" ?
                        <>
                            <ListFestivalFavoutireBttn
                                key={el.id}
                                id={el.id}
                                evento={el.nome}
                                data={el.data}
                                imagem={el.imagem}
                                local={el.local}
                            />
                        </>
                        : null
                ))}
                {favourites.favoritos.map((el) => (
                    el.tipo === "artista" ?
                        <ListArtist key={el.id}
                                    id={el.id}
                                    nome={el.nome}
                                    imagem={el.imagem}
                        /> : null
                ))}
                {renderPagination(
                    favourites.paginacao.pagina,
                    setPaginaFavourites,
                    favourites.paginacao.paginas,
                    favourites.paginacao.resultados
                )}
            </>
        );
    };

    const no_payments = <div className={"no-payments"}>
        <h1 className={"h1-block-title"}>Pagamentos</h1>
        <LogoGreyed message={'Sem pagamentos'}/>
    </div>;

    const pending_payments = <div className={"pending-payments"}>
        <h1 className={"h1-block-title"}>Pagamentos pendentes</h1>
        {pendingList.map(el =>
            <ListPaymentPending
                key={el.id}
                data_compra={el.data_compra}
                entidade={el.entidade}
                referencia={el.referencia}
                valor={el.valor}
            />
        )}

    </div>;

    const other_payments = <div className={"other-payments"}>
        <h1 className={"h1-block-title"}>Outros pagamentos</h1>
        {payedList?.pagamentos.map(el => <>

            <ListPaymentComplete
                key={el.id}
                tipo={el.tipo}
                data_validado={el.data_validado}
                valor={el.valor}
            /></>
        )}
    </div>;

    const handlePayments = () => {
        if (pendingList.length < 1 && payedList.length < 1) {
            return no_payments;
        }
        if (payedList.length < 1) {
            return pending_payments;
        }
        if (pendingList.length < 1) {
            return <>
                {other_payments}
                {renderPagination(
                    paginaPayed,
                    setPaginaPayed,
                    numeroPaginasPayed,
                    totalPaginasPayed)}
            </>;

        }
        return <>
            {pending_payments}
            {other_payments}
            {renderPagination(
                paginaPayed,
                setPaginaPayed,
                numeroPaginasPayed,
                totalPaginasPayed)}

        </>;
    };

    const renderPagination = (pagina, setPagina, numeroPaginas, totalPaginas) => {
        return (
            <Pagination
                pagina={pagina}
                setPagina={setPagina}
                numeroPaginas={numeroPaginas}
                single_page={totalPaginas <= numero_resultados}
            />
        );
    };


    return <div className={"Personal"}>
        <NavBar/>
        {pending ? <PendingPaymentWarning/> : null}
        <div>
            <h1 className={"h1-block-title"}>Favoritos</h1>
            {favourites.length < 1
                ? <LogoGreyed message={'Sem favoritos'}/>
                : handleFavorites()
            }
            {handlePayments()}
        </div>
    </div>;
};

export default Personal;