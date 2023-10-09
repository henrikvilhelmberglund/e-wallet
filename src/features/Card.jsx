import { useDispatch } from "react-redux";
import { activeCard, deleteCard } from "./cardSlice";
import styles from './CreateCard.module.css';


export const Card = (props) => {
    const dispatch = useDispatch();
    const {active, cardNumber, cardholder, ccv, expireMonth, expireYear, vendor, id} = props


    const handleActiveCard = () => {
        dispatch(activeCard(id))
    }

    const handleDeleteCard = () => {
        dispatch(deleteCard(id))
    }
    
    return (
      <div className={styles.container}>
        {active ? (
          <div>
            <div className={styles.card}>
            <p className={styles.vendor}>{vendor}</p>
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
            <p className={styles.vendor}>{vendor}</p>
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