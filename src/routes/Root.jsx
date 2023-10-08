import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useDispatch } from "react-redux";
import { getRandomUser} from "../features/cardSlice"
import { useEffect, useState } from "react";

const Root = () => {
    const dispatch = useDispatch();
    const [hasFetchedUserData, setHasFetchedUserData] = useState(false);

    
    useEffect(() => {
        if (!hasFetchedUserData) {
            dispatch(getRandomUser());
            setHasFetchedUserData(true); 
        }
    }, [dispatch, hasFetchedUserData]);

    return (
        <div>
        <Header />
        <Outlet />
        <Footer />
        </div>
    )
}

export default Root;