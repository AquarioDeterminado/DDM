import {useEffect, useState} from "react";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";
import styles from "./DeckManager.module.css";
import {getCurrentHand, getStockCards} from "../../../controllers/UserController";

function DeckManager() {
    const [currentHand, setCurrentHand] = useState({state: INFO_STATUS.LOADING});
    const [allCardsButHand, setallCardsButHand] = useState({state: INFO_STATUS.LOADING});

    useEffect(() => {

        getStockCards((response, status) => {
            if (status === 200)
                setallCardsButHand({data: response, state: INFO_STATUS.READY});
            else
                setallCardsButHand({state: INFO_STATUS.ERROR});
        });

        getCurrentHand((response, status) => {
            if (status === 200)
                setCurrentHand({data: response, state: INFO_STATUS.READY});
            else
                setCurrentHand({state: INFO_STATUS.ERROR});
        });
    }, []);

    return (
        <div>
            <h1>Deck Manager</h1>
            <div className={styles.deckManager}>
                <div className={styles.currentHand}>
                    {currentHand.state === INFO_STATUS.READY ? currentHand.map((card) => {
                        return (
                            <div>
                                {card}
                            </div>
                        );
                    }) : "ERROR"}
                </div>



                <div className={styles.stockCards}>
                    {allCardsButHand.state === INFO_STATUS.READY ? allCardsButHand.map((card) => {
                        return (
                            <div>
                                {card}
                            </div>
                        );
                    }) : "ERROR"}
                </div>
            </div>
        </div>
    );
}

export default DeckManager;