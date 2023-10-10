import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";


export const Header = () => {

    const location = useLocation();

    const isCardsLinkActive = location.pathname === '/e-wallet/cards';
    const isAddCardLinkActive = location.pathname === '/e-wallet/addcard';

    return (
      <header >
        <h1>E-wallet</h1>
        <ul>
            <Link to='/cards' style={{ textDecoration: isCardsLinkActive ? "underline" : "none" }} >Cards</Link>
            <Link to='/addcard' style={{ textDecoration: isAddCardLinkActive ? "underline" : "none" }}>Add card</Link>
        </ul>
      </header>
    );
};