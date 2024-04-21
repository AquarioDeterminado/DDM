import styles from  "./CardHand.module.css";
import {useEffect, useState} from "react";
import {getCurrentHand} from "../../../controllers/UserController";
import card from "../Card/Card";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";
import Card from "../Card/Card";

function CardHand(props) {

    const {onClick, cards} = props;

    if(cards !== undefined)
        return (
            <div onClick={onClick} className={styles.cardHand}>
                <h2>Card Hand</h2>
                <div className={styles.cardRow}>
                    {cards.state === INFO_STATUS.READY ? cards.cards.map((card) => {
                        return <Card key={card.id} cardInfo={card} />
                    }): "ERROR"}
                </div>
            </div>
        );
    else
        return (<> </>);
}

export default CardHand;