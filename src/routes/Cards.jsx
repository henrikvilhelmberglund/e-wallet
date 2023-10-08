import {Link} from "react-router-dom";
import { CardsList } from "../features/CardsList";


const Cards = () => {
    return (
        <div>
        {/* <button> */}
        <Link to='/addcard'>Add card</Link>
        {/* </button> */}
        <CardsList />
        </div>
    )
}

export default Cards;