import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import './App.scss';
import ProviderUser from "./ContextUser";
import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Festival from "./Pages/Festival";
import Artist from "./Pages/Artist";
import Search from "./Pages/Search";
import Tickets from "./Pages/Tickets";
import Personal from "./Pages/Personal";
import Cashless from "./Pages/Cashless";
import Splash from "./Pages/Splash";
import TicketBought from "./Pages/TickteBought";

function App() {
    return (
        <BrowserRouter>
            <ProviderUser>
                <div className="App">
                    {/*<TestAPI/>*/}
                    {/* <Test/>*/}
                    <Splash/>
                    <Switch>
                        <Route path={"/login"} component={Login}/>
                        <Route path={"/homepage"} component={Homepage}/>
                        <Route path={"/festival/:id"} component={Festival}/>
                        <Route path={"/artist/:id"} component={Artist}/>
                        <Route path={"/search"} component={Search}/>
                        <Route path={"/tickets/"} component={Tickets}/>
                        <Route path={"/personal"} component={Personal}/>
                        <Route path={"/cashless/:id_evento"} component={Cashless}/>
                        <Route path={"/bought/:id_evento"} component={TicketBought}/>

                        <Redirect to={"/login"}/>
                    </Switch>
                </div>
            </ProviderUser>
        </BrowserRouter>
    );
}

export default App;
