import styles from './DogBattle.module.css';
import {useEffect, useState} from "react";
import {getBattleInfo, getCards, getPlayersInfo} from "../../../controllers/BattleController";
import Card from "../../components/Card/Card";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";
import CardHand from "../../components/CardHand/CardHand";
import PlayerFigthingInfo from "../../components/PlayerFigthingInfo/PlayerFigthingInfo";

function DogBattle(props) {

    const [cards, setCards] = useState({state: INFO_STATUS.LOADING});
    const [opponentCards, setOpponentCards] = useState({state: INFO_STATUS.LOADING});
    const [battleInfo, setBattleInfo] = useState({state: INFO_STATUS.LOADING});
    const [opponentInfo, setOpponentInfo] = useState({state: INFO_STATUS.LOADING});
    const [playerInfo, setPlayerInfo] = useState({state: INFO_STATUS.LOADING});

    useEffect(() => {

        getBattleInfo((info) => {
            setBattleInfo(info);
            //TODO: Implement Welcome Screen: Etc;
        });

        getCards((cards) => {
            let userCardsList = [];
            let opponentCardsList = [];

            for (let card of cards.userCards) {
                userCardsList.push(<Card cardinfo={card} />);
            }

            for (let card of cards.opponentCards) {
                opponentCardsList.push(<Card cardinfo={card} />);
            }

            setCards(userCardsList);
            setOpponentCards(setOpponentCards);
        });

        getPlayersInfo((info) => {
            setPlayerInfo(info.user);
            setOpponentInfo(info.opponent);
        });

    },[]);

    return ( //TODO: Error Handling;
        <div className={styles.dogBattle}>
            <div className={styles.opponentSide}>
                <PlayerFigthingInfo playerInfo={opponentInfo} style={styles.opponentInfo} />
                <CardHand/>
            </div>

            <div className={styles.battleField}>
                <div className={styles.battleField__user}>
                </div>

                <div className={styles.battleField__battleState}>
                </div>

                <div className={styles.battleField__opponent}>
                </div>
            </div>


            <div className={styles.userSide}>
                <PlayerFigthingInfo playerInfo={playerInfo} style={styles.playerInfo} />
                <CardHand/>
            </div>
        </div>
    );
}

export default DogBattle;