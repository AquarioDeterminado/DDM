import styles from  "./CardHand.module.css";
import {useEffect, useState} from "react";
import {getCurrentHand} from "../../../controllers/UserController";
import card from "../Card/Card";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";

function CardHand(props) {

    const [cards, setCards] = useState({status: INFO_STATUS.LOADING});

    const {onClick} = props;

    useEffect(() => {

        getCurrentHand((res, status) => {
            if (status === 200)
                setCards(res.cards);
        });

    }, []);


  return (
      <div onClick={onClick} className={styles.cardHand}>
          <h2>Your Hand</h2>
          <div className={styles.cardRow}>
              {cards.state === INFO_STATUS.READY ? cards.cards.map((card) => {
                  return <card key={card.id} card={card} />
              }): "ERROR"}
          </div>
      </div>
  );
}

export default CardHand;