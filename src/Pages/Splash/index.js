import './style.scss';
import {LogoMain} from "../../Components/logo_images";
import {useEffect, useState} from "react";

const Splash = props => {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRedirect(true);
        }, 4000);

        return () => clearTimeout(timeout);
    }, []);

    if (redirect)
        return null;

    return <div className={"Splash"}>
        <div className={"splash-logo"}>
            <LogoMain/>
        </div>
        <div className={"under-text-splash"}>
            <span>Ligando os amplificadores</span>
        </div>
    </div>;
};

export default Splash;