import {NavLink} from "react-router-dom";
import '../../assets/Icons.scss';
import './style.scss';

const NavBar = props => {

    return <div className={"NavBar"}>
        <NavLink exact to={"/homepage"}
                 className={"nav-bar-item home"}
                 activeClassName={`home-active`}/>

        <NavLink to={"/search"}
                 className={`nav-bar-item search`}
                 activeClassName={`search-active`}/>

        <NavLink to={"/tickets"}
                 className={`nav-bar-item ticket-small`}
                 activeClassName={`ticket-small-active`}/>

        <NavLink to={"/personal"}
                 className={`nav-bar-item user`}
                 activeClassName={`user-active`}/>

    </div>;
};

export default NavBar;