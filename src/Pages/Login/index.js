import './style.scss';
import {useForm} from "react-hook-form";
import React from "react";
import {Redirect} from "react-router-dom";
import {ContextUser} from "../../ContextUser";
import {LogoLogin} from "../../Components/logo_images";


const Login = props => {
    const {handleSubmit, register, formState} = useForm();
    const context = React.useContext(ContextUser);
    const {setName, email, setEmail} = context;

    const onSubmit = (data) => {
        setName(data.name);
        setEmail(data.email);

    };

    const checkError = (field) => {
        return formState.errors[field] ? "error" : "";
    };


    return <div className={"LoginPage"}>
        <div className={"logo"}>
            <LogoLogin/>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={"login"}>

            {/*//   NOME  */}
            <label>Nome</label>
            <input
                type={"text"}
                placeholder={"Introduz o teu nome"}
                className={checkError("name") + " border-circle"}
                {...register("name", {
                    required: "O nome é obrigatório preencher",
                    minLength: {
                        value: 2,
                        message: "O nome tem de ter pelo menos 2 caracteres"
                    }
                })}/>
            <small>{formState.errors["name"]?.message}</small>

            {/*//   EMAIL  */}
            <label>Email</label>
            <input
                type={"email"}
                placeholder={"Introduz o teu e-mail"}
                className={checkError("email") + " border-circle"}
                {...register("email", {
                    required: "O email é obrigatório preencher",
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "O email não tem um formato válido"
                    }
                })}/>
            <small>{formState.errors["email"]?.message}</small>

            <button type={"submit"} className={"login-icon bttn-submit"}>
            </button>
        </form>
        {email ? <Redirect to={"/homepage"}/> : ''}
    </div>;
};

export default Login;