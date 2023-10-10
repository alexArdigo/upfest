import './style.scss';
import axiosFest from "../../Authentication";
import {ContextUser} from "../../ContextUser";
import React, {useContext, useEffect, useState} from "react";
import {CardFestival, CardFestivalPurchasedHomePage} from "../../Components/cards_images";
import NavBar from "../../Components/nav_bar";
import {LogoGreyed} from "../../Components/logo_images";
import Spinning from "../../Components/spinning";
import Greeting from "../../Components/greeting";


const Homepage = () => {
    const {name, email} = useContext(ContextUser);
    const [lista, setLista] = useState(null);
    const [futuros, setFuturos] = useState([]);

    useEffect(() => {

        // LISTAR BILHETES DE PARTICIPANTE
        axiosFest.get("/participante/bilhetes/listar",
            {
                params: {
                    participante: email
                }
            }
        ).then(resultado => setLista(resultado.data)
        ).catch(e => console.log("Erro", e));

        // LISTAR EVENTOS PARA SUGESTOES
        axiosFest.get(`/evento/listar`,
            {
                params: {
                    apenas_futuros: 1
                }
            })
            .then(resultado => setFuturos(resultado.data.eventos))
            .catch(e => console.log("Erro", e));

    }, []);


    if (!lista || lista.length < 1) {
        return <Spinning/>;
    }

    return <div className={"Homepage"}>
        <NavBar/>
        <div>
            <h1 className={'h1-block-title'}><Greeting/>{name}</h1>
        </div>
        <div>
            {lista.atuais.length > 0
                ? <>
                    {lista.atuais.map((el, idx) => {
                        return <CardFestivalPurchasedHomePage
                            key={el.id}
                            id={el.id}
                            evento={el.evento}
                            id_evento={el.id_evento}
                            data_evento={el.data_evento}
                            local={el.local}
                            imagem_evento={el.imagem_evento}
                            serie={el.serie}
                            saldo={el.conta_cashless.valor_atual}
                        />;
                    })}
                </>
                : <LogoGreyed message={'Sem eventos a decorrer'}/>}
        </div>
        <div>
            <h1 className={'h1-block-title'}>Sugestões</h1>
        </div>
        <div>
            {futuros.map(el => {
                return <CardFestival
                    key={el.id}
                    id={el.id}
                    designacao={el.designacao}
                    imagem={el.imagem}
                    data={el.data}
                    local={el.local}
                    preco_desde={el.preco_desde}
                />;
            })}
        </div>
    </div>;
};

export default Homepage;