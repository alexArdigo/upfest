import {ArtistHeaderPicture, CardFestival, CardFestivalPurchasedHomePage, FestivalHeaderPicture} from "./cards_images";

import {
    ListArtist,
    ListBilhete,
    ListBilheteCompact,
    ListConcerto,
    ListFestivalFavoutireBttn
} from "./list_cards_festival";

import {ListPaymentComplete, ListPaymentPending} from "./list_cards_payments";
import {ListMovementTopUp} from "./list_cards_movements";
import {
    BttnLeftArrowActive,
    BttnLeftArrowGreyed,
    BttnRightArrowActive,
    BttnRightArrowGreyed,
    BttnsConfirmarRejeitar
} from "./buttons";

import TopUpForm from "./top_up_form";
import SearchBar from "./search_bar";
import {PaymentFailure, PaymentSuccess, PendingPaymentWarning, TopUpSuccess} from "./warnings";
import Login from "../Pages/Login";
import {LogoGreyed, LogoMain} from "./logo_images";
import CurrentBalance from "./current_balance";


const Test = props => {
    return <>
        {/* <NavBar/>*/}
        <LogoMain/>
        <Login/>
        <LogoGreyed/>
        <CardFestival/>
        <FestivalHeaderPicture/>
        <CardFestivalPurchasedHomePage/>
        <ArtistHeaderPicture/>
        <ListFestivalFavoutireBttn/>
        <ListArtist/>
        <ListConcerto/>
        <ListBilhete/>
        <ListBilheteCompact/>
        <ListPaymentComplete/>
        <ListPaymentPending/>
        <ListMovementTopUp/>
        <BttnsConfirmarRejeitar/>
        <BttnLeftArrowActive/>
        <BttnLeftArrowGreyed/>
        <BttnRightArrowActive/>
        <BttnRightArrowGreyed/>
        <TopUpForm/>
        <SearchBar/>
        <PendingPaymentWarning/>
        <TopUpSuccess/>
        <PaymentSuccess/>
        <PaymentFailure/>
        <CurrentBalance/>
    </>;
};

export default Test;