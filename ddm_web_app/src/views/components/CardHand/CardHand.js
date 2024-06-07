import styles from  "./CardHand.module.css";
import CardRow, {SelectableCardRow} from "../CardRow/CardRow";
import {SelectableCard} from "../Card/Card";
import {useEffect} from "react";

export function PlayerHand(props) {
    const {cards, id, isContainer, play} = props;

    if(cards !== undefined)
        return (
            <div className={styles.cardHand}>
                <SelectableCardRow play={play} cards={cards} id={id} isContainer={isContainer}/>
            </div>
        );
    else
        return (<> </>);
}

function CardHand(props) {

    const {onClick, cards, id, isContainer} = props;

    if(cards !== undefined)
        return (
            <div onClick={onClick} className={styles.cardHand}>
                <CardRow cards={cards} id={id} isContainer={isContainer}/>
            </div>
        );
    else
        return (<> </>);
}

export default CardHand;