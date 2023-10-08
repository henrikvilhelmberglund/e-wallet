import {Link} from "react-router-dom";
import { CreateCard } from "../features/CreateCard";

const Addcard = () => {
    return (
        <div>
        <Link to='/cards'>Cards</Link>
        <CreateCard />
        </div>
    )
}

export default Addcard;