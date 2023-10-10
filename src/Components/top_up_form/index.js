import './style.scss';
import {useForm} from "react-hook-form";
import {useContext, useEffect, useState} from "react";
import {ContextUser} from "../../ContextUser";
import axiosFest from "../../Authentication";


const TopUpForm = props => {
    const {email} = useContext(ContextUser);
    const {handleSubmit, setValue, register, formState, reset} = useForm();
    const [account, setAccount] = useState(false);
    const [events, setEvents] = useState([]);
    const {id_evento, setShowBannerSuccess, setShowBannerFailure} = props;

    useEffect(() => {

        axiosFest.get(`/participante/bilhetes/listar`,
            {
                params: {
                    participante: email
                }
            }
        )
            .then(resultado => {
                setAccount(resultado.data.success);
                setEvents(prev => [...prev, resultado.data.atuais, resultado.data.futuros].flat(1));
            })
            .catch(e => console.log("Erro", e));
    }, []);

    const userHasEventTicket = events.some(el => el.id_evento === parseInt(id_evento));


    const OnSubmit = (data) => {

        if (!account || !userHasEventTicket) {
            setShowBannerFailure(true);
            setTimeout(() => {
                setShowBannerFailure(false);
            }, 5000);
            console.log("Erro: Participante não tem conta ou não está registado neste evento.");
        } else {
            axiosFest.post(`/cashless/${id_evento}/carregar`,
                {
                    participante: email,
                    valor: Number(data['topUp'])
                })
                .then(resultado => {

                    if (resultado.data.success) {
                        setShowBannerSuccess(true);
                        setTimeout(() => {
                            setShowBannerSuccess(false);
                        }, 5000);
                    }
                })
                .catch(e => {
                    console.log("Erro:", e.response.data.message);
                    setShowBannerFailure(true);
                    setTimeout(() => {
                        setShowBannerFailure(false);
                    }, 5000);
                });
        }
        reset();
    };

    if (!events) {
        return null;
    }

    const checkError = field => {
        return formState.errors[field] ? "error" : "";
    };

    return <>
        <form onSubmit={handleSubmit(OnSubmit)} className={"Top-up"}>
            <div className={"top-up-box"}>
                <input type="text" className={checkError("topUp") + " input-box border-circle"}
                       {...register("topUp", {
                           min: {
                               value: 5,
                               message: "Valor mínimo de 5 euros"
                           },
                           pattern: {
                               value: /^[0-9]+$/g,
                               message: "Insira somente números"
                           },
                           onChange: (e) => {
                               setValue("topUp", e.target.value);
                           }
                       })}
                       placeholder={"Valor a carregar"}/>
                <small>{formState.errors["topUp"]?.message}</small>
            </div>

            <button type={"submit"} className={"BttnPlus border-circle"}>
                <div className={"plus"}></div>
            </button>
        </form>
    </>;
};

export default TopUpForm;