import { format, addMonths, addYears } from 'date-fns'
import { useSelector, useDispatch } from "react-redux";
import { useState} from "react";
import { addCard, incrementCardId } from "./cardSlice";
import styles from '../features/CreateCard.module.css';

import visaLogo from "/public/images/visaLogo.png";
import americanExpressLogo from "/public/images/AmericanExpresslogo.png";
import mastercardLogo from "/public/images/mastercardLogo.png";

const reset = () => {
    let ccvValue = document.querySelector("#ccv");
    let vendorValue = document.querySelector("#vendor");
    let cardNumberValue = document.querySelector("#cardNumber");
    let expireMonthValue = document.querySelector("#expireMonth");
    let expireYearValue = document.querySelector("#expireYear");

    ccvValue.value = "";
    vendorValue.value = "";
    cardNumberValue.value = "";
    expireMonthValue.value = "";
    expireYearValue.value = "";
}


export const CreateCard = () => {
    const dispatch = useDispatch();

    const { cards } = useSelector((state) => state.cards);
    const { firstName, lastName } = cards[0].cardholder;
    const { nextCardId } = useSelector((state) => state.cards);
    
    const [inputValues, setInputValues] = useState({});
    const [errors, setErrors] = useState({});
    const [buttonText, setButtonText] = useState("Add card");
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    const handleCardHover = () => {
        setIsCardFlipped(true);
    }

    const handleCardLeave = () => {
        setIsCardFlipped(false);
    }

    const currentDate = new Date();
    const months = Array.from({length:12}, (_,index) => {
        const nextMonth = addMonths(currentDate, index);
        return {
            value: format(nextMonth, 'MM'),
        };
    });

    const years = Array.from({length:5}, (_,index) => {
        const nextYear = addYears(currentDate, index + 1);
        return {
            value: format(nextYear, 'yy'),
        };
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === "cardNumber") {
            const formattedCardNumber = value.replace(/\D/g, '').slice(0, 16);
            const formattedCardNumberWithDashes = formattedCardNumber.match(/.{1,4}/g);
            const formattedValue = formattedCardNumberWithDashes ? formattedCardNumberWithDashes.join('-') : '';

            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                [id]: formattedValue,
            }))
        } else {
            setInputValues((prevInputValues) => ({
                ...prevInputValues,
                [id]: value,
                
            }));
        }
        
    };

    const { vendor, cardNumber, expireMonth, expireYear, ccv } = inputValues

    const validateInputs = () => {
        let newErrors = {};

        if(!vendor) {
            newErrors.vendor = "Vendor is required";
        }

        if (cardNumber) {
            const numericCardNumber = cardNumber?.replace(/\D/g, '');
            const formattedCardNumber = numericCardNumber.match(/.{1,4}/g).join('-');
            const hello = cards.filter((card) => card.cardNumber === formattedCardNumber);
          
            if (isNaN(numericCardNumber) || numericCardNumber.toString().length !== 16) {
              newErrors.cardNumber = "Cardnumber must be a 16-digit number";
            } else if (hello.length > 0) {
              newErrors.cardNumber = "This cardnumber already exists, create a unique one";
            }
        } else {
            newErrors.cardNumber = "Cardnumber is required"
        }

        if (!expireMonth) {
            newErrors.expireMonth = "Expiremonth is required";
        }

        if (!expireYear) {
            newErrors.expireYear = "Expireyear is required";
        }

        if (isNaN(ccv) || ccv.toString().length !== 3 ) {
            newErrors.ccv = "CCV must be a 3 digit number";
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length === 0) {

            setButtonText("Success! New card has been created.")
            setTimeout(() => {
                setButtonText("Add card")
            }, 2000);

            const newCardId = nextCardId;
            dispatch(incrementCardId());


            let data = {
                id: newCardId,
                vendor: vendor,
                cardNumber: cardNumber,
                expireMonth: expireMonth,
                expireYear: expireYear,
                ccv: ccv,
                active: false,
                cardholder: {
                    firstName: firstName,
                    lastName: lastName,
                },
            };
    
            dispatch(addCard(data))

            setInputValues({})
            reset();
        }
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
        <h3>Preview of your new card</h3>
        {!isCardFlipped ? (
            <div className={styles.card}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
            >
            {logo && <img className={styles.vendor} src={logo} alt={`${vendor} Logo`} />}

            <p className={styles.cardnumber}>{cardNumber ? cardNumber : '____-____-____-____'}</p>
            <div className={styles.cardholder}>
                <p>CARDHOLDER</p>
                <p>{firstName} {lastName} </p>
            </div>
            <div className={styles.expiry}>
                <p>MONTH/YEAR</p>
                <p>{expireMonth || ""} / {expireYear || ""} </p>
            </div>
            </div>
        ) : ""}
        {isCardFlipped? (
            <div className={styles.backContent}
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
            >
                <div className={styles.cardholderBack}>
                <p>{firstName} {lastName} </p>
            </div>
            <div className={styles.ccv}>
                <p>ccv:</p>
                <p>{ccv || ""} </p> 
            </div>
            </div>
        ) : ""}
                    

        {cards.length === 4 ? (
            <p>Note: you cannot have more than 4 cards, 
                delete a card to be able to create a new
            </p>
        ) : null}

        <div className={styles.form}>
        <h3 className={styles.fh3}>Add a new card</h3>
        <p className={styles.fp}>Max amount of cards is 4</p>
        <input type="text" id="firstName" value={firstName} placeholder="Förnamn" readOnly />
        <input type="text" id="lastName" value={lastName} placeholder="Efternamn" readOnly />
        <label htmlFor="vendor">Vendor</label>
        <select name="" id="vendor" onChange={handleInputChange}>
            <option value="" hidden>Choose vendor</option>
            <option value="American Express">American Express</option>
            <option value="VISA">VISA</option>
            <option value="MasterCard">Mastercard</option>
        </select>
        <p className={styles.error}>{errors.vendor}</p>
        <label htmlFor="cardNumber">Cardnumber</label>
        <input type="text" id="cardNumber" maxLength="16" onChange={handleInputChange} placeholder="Kortnummer" />
        <p className={styles.error}>{errors.cardNumber}</p>
        <label htmlFor="expireMonth">Month</label>
        <select name="" id="expireMonth" onChange={handleInputChange}>
            <option value="" hidden>MM</option>
            {months.map((option, i) => (
            <option key={i} value={+option.value}>{option.value}</option>
            ))}
        </select>
        <p className={styles.error}>{errors.expireMonth}</p>
        <label htmlFor="expireYear">Year</label>
        <select name="" id="expireYear" onChange={handleInputChange}>
            <option value="" hidden>YY</option>
            {years.map((option, i) => (
            <option key={i} value={+option.value}>{option.value}</option>
            ))}
        </select>
        <p className={styles.error}>{errors.expireYear}</p>
        <label htmlFor="ccv">ccv</label>
        <input type="text" id="ccv" maxLength="3" onChange={handleInputChange} onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave} placeholder="ccv" />
        <p className={styles.error}>{errors.ccv}</p>
        {cards.length < 4 ? (
            <button className={styles.addBtn} onClick={validateInputs}>{buttonText}</button>
        ) : null }
        </div>
        </div>
    )
}