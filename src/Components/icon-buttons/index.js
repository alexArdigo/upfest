import './style.scss';
import {useContext} from "react";
import {ContextUser} from "../../ContextUser";


const BttnFavourite = props => {
    const {toggleFavourites, isFavourite} = useContext(ContextUser);

    const handleClick = () => {
        toggleFavourites(props.type, props.id);
    };
    let is_favourite = isFavourite(props.type, props.id);

    return <>
        <div className={"BttnFavourite bg-circle-small"} onClick={handleClick}>
            <div className={is_favourite ? 'heart-full' : 'heart-open'}></div>
        </div>
    </>;
};


const BttnTicket = props => {
    return <>
        <div className={"bg-circle-small"}>
            <div className={"ticket-small-active"}></div>
        </div>
    </>;
};

const BttnInfo = props => {
    return <>
        <div className={"bg-circle-small"}>
            <div className={"info"}></div>
        </div>
    </>;
};

export {BttnFavourite, BttnTicket, BttnInfo};