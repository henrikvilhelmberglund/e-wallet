import { useDispatch } from "react-redux";
import { activeCard, deleteCard } from "./cardSlice";
import styles from './CreateCard.module.css';
import visaLogo from "/public/images/visaLogo.png";
import americanExpressLogo from "/public/images/AmericanExpresslogo.png";
import mastercardLogo from "/public/images/mastercardLogo.png";




export const Card = (props) => {
    const dispatch = useDispatch();
    const {active, cardNumber, cardholder, expireMonth, expireYear, vendor, id} = props


    const handleActiveCard = () => {
        dispatch(activeCard(id))
    }

    const handleDeleteCard = () => {
        dispatch(deleteCard(id))
    }


    let logo;

    if(vendor === "VISA") {
      logo = visaLogo;
      
    } else if (vendor === "MasterCard") {
      logo = mastercardLogo;

    } else if (vendor === "American Express") {
      logo = americanExpressLogo;
    }
  
    
    return (
      <div className={styles.container}>
        {active ? (
          <div>
            <div className={styles.card}>
            <img className={styles.vendor} src={logo} alt="Visa Logo" />

            <p className={styles.cardnumber}>{cardNumber}</p>
            <div className={styles.cardholder}>
              <p>CARDHOLDER</p>
              <p>{cardholder.firstName} {cardholder.lastName}</p>
            </div>
            <div className={styles.expiry}>
              <p>MONTH/YEAR</p>
              <p>{expireMonth}/{expireYear}</p>
            </div>
          </div>
          </div>
        ) : (
          <div className={styles.container}>
            <button className={styles.card} onClick={handleActiveCard}>
            <div className={styles.card}>
            <img className={styles.vendor} src={logo} alt="Visa Logo" />
            <p className={styles.cardnumber}>{cardNumber}</p>
            <div className={styles.cardholder}>
              <p>CARDHOLDER</p>
              <p>{cardholder.firstName} {cardholder.lastName}</p>
            </div>
            <div className={styles.expiry}>
              <p>MONTH/YEAR</p>
              <p>{expireMonth}/{expireYear}</p>
            </div>
            </div>
            </button>
          </div>
        )}
        {!active? (<button className={styles.delete} onClick={handleDeleteCard}>Delete card</button>) : null }
      </div>
     
    );
};