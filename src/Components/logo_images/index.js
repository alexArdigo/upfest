import './style.scss';

const LogoMain = props => {
    return <>
        <div className={"logo-large"}></div>
    </>;
};

const LogoLogin = props => {
    return <>
        <div className={"logo-small"}></div>
    </>;
};

const LogoGreyed = props => {
    return <>
        <div className={"LogoGreyed"}>
            <div>
                <div className={"logo-grey"}></div>
            </div>
            <div>
                <span>{props.message}</span>
            </div>
        </div>
    </>;
};


export {LogoMain, LogoLogin, LogoGreyed};