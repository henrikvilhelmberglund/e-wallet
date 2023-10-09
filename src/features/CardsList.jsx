import { useSelector } from "react-redux";
import { Card } from "./Card"; 
import styles from '../features/createcard.module.css';

export const CardsList = () => {
    const { cards } = useSelector((state) => state.cards);

    const activeCards = cards.filter((card) => card.active);
    const inactiveCards = cards.filter((card) => !card.active);

    return (
        <div>
            <h2>Your cards</h2>
            <h3>Active Card</h3>
            {activeCards.map((card, i) => (
            <div key={i}>
                <Card key={i} {...card} />
            </div>
            ))}
            {inactiveCards.length > 0 && (
            <>
            {inactiveCards.length > 1 ? <h3>Inactive Cards</h3> : <h3>Inactive Card</h3>}
            <p>Click on a card to make it active</p>
            </>
            )}
            {inactiveCards.map((card, i) => (
            <div key={i}>
                <Card key={i} {...card} />
            </div>
            ))}
        </div>
    )
}