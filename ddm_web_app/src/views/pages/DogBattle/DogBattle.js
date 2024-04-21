import styles from './DogBattle.module.css';
import {useEffect, useState} from "react";
import {getBattleInfo, getCards, getPlayersInfo} from "../../../controllers/BattleController";
import Card from "../../components/Card/Card";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";
import CardHand from "../../components/CardHand/CardHand";
import PlayerFigthingInfo from "../../components/PlayerFigthingInfo/PlayerFigthingInfo";
import card from "../../components/Card/Card";

function DogBattle(props) {

    const [cards, setCards] = useState({state: INFO_STATUS.LOADING});
    const [opponentCards, setOpponentCards] = useState({state: INFO_STATUS.LOADING});
    const [battleInfo, setBattleInfo] = useState({state: INFO_STATUS.LOADING});
    const [opponentInfo, setOpponentInfo] = useState({state: INFO_STATUS.LOADING});
    const [playerInfo, setPlayerInfo] = useState({state: INFO_STATUS.LOADING});

    const opponentInfoStyle = {
        playerInfo: styles.opponentInfo,
        playerPhoto: styles.opponentPhoto,
    };

    const playerInfoStyle = {
        playerInfo: styles.playerInfo,
        playerPhoto: styles.playerPhoto,
    };

    useEffect(() => {

        /*
        getBattleInfo((info) => {
            setBattleInfo(info);
            //TODO: Implement Welcome Screen: Etc;
        });*/

        /*getCards((cards) => {
            let userCardsList = [];
            let opponentCardsList = [];

            for (let card of cards.userCards) {
                userCardsList.push(<Card cardinfo={card} />);
            }

            for (let card of cards.opponentCards) {
                opponentCardsList.push(<Card cardinfo={card} />);
            }

            setCards({state: INFO_STATUS.READY, cards: userCardsList});
            setOpponentCards({state: INFO_STATUS.READY, cards: opponentCardsList});

        });*/
        setCards({state: INFO_STATUS.READY, cards: [{id: 1, name: "Card1", hp: 100, photo: "https://via.placeholder.com/150"}, {id: 2, name: "Card2", hp: 100, photo: "https://via.placeholder.com/150"}]});
        setOpponentCards({state: INFO_STATUS.READY, cards: [{id: 1, name: "Card1", hp: 100, photo: "https://via.placeholder.com/150"}]});


        /*
        getPlayersInfo((info) => {
            setPlayerInfo(info.user);
            setOpponentInfo(info.opponent);
        });*/

        setPlayerInfo({status: INFO_STATUS.READY, player: {username: "User", hp: 100, photo: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="3.5" stroke="currentColor" strokeWidth="2"/>
                    <path stroke="currentColor" strokeWidth="2" d="M7.96473 13.6977C9.13333 13.2367 10.3783 13 11.6346 13H12.3654C13.6217 13 14.8667 13.2367 16.0353 13.6977L16.7475 13.9787C17.4493 14.2556 18.097 14.6535 18.6612 15.1543L18.7766 15.2568C19.0745 15.5212 19.3406 15.8194 19.5694 16.1454C20.1751 17.0082 20.5 18.0367 20.5 19.0909V19.0909C20.5 19.8691 19.8691 20.5 19.0909 20.5H4.90913C4.13089 20.5 3.5 19.8691 3.5 19.0909V19.0909C3.5 18.0367 3.82494 17.0082 4.43057 16.1454C4.65941 15.8194 4.92547 15.5212 5.22335 15.2568L5.33878 15.1543C5.90299 14.6535 6.55073 14.2556 7.25252 13.9787L7.96473 13.6977Z"/>
                </svg>)}});
        setOpponentInfo({status: INFO_STATUS.READY, player: {username: "Opponent", hp: 100, photo: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="3.5" stroke="currentColor" strokeWidth="2"/>
                    <path stroke="currentColor" strokeWidth="2" d="M7.96473 13.6977C9.13333 13.2367 10.3783 13 11.6346 13H12.3654C13.6217 13 14.8667 13.2367 16.0353 13.6977L16.7475 13.9787C17.4493 14.2556 18.097 14.6535 18.6612 15.1543L18.7766 15.2568C19.0745 15.5212 19.3406 15.8194 19.5694 16.1454C20.1751 17.0082 20.5 18.0367 20.5 19.0909V19.0909C20.5 19.8691 19.8691 20.5 19.0909 20.5H4.90913C4.13089 20.5 3.5 19.8691 3.5 19.0909V19.0909C3.5 18.0367 3.82494 17.0082 4.43057 16.1454C4.65941 15.8194 4.92547 15.5212 5.22335 15.2568L5.33878 15.1543C5.90299 14.6535 6.55073 14.2556 7.25252 13.9787L7.96473 13.6977Z"/>
                </svg>}});

    },[]);

    return ( //TODO: Error Handling;
        <div className={styles.dogBattle}>
            <div className={styles.opponentSide}>
                <PlayerFigthingInfo playerInfo={opponentInfo} styles={opponentInfoStyle} />
                <CardHand cards={opponentCards}/>
            </div>

            <div className={styles.battleField}>
                <div className={styles.battleField__user}>
                    {cards.state === INFO_STATUS.READY ? <Card cardInfo={cards.cards[0]}/>
                        : "ERROR"}                </div>

                <div className={styles.battleField__battleState}>
                    Waiting for User
                </div>

                <div className={styles.battleField__opponent}>
                    {opponentCards.state === INFO_STATUS.READY ? <Card cardInfo={opponentCards.cards[0]}/>
                        : "ERROR"}
                </div>
            </div>


            <div className={styles.userSide}>
                <PlayerFigthingInfo playerInfo={playerInfo} styles={playerInfoStyle} />
                <CardHand cards={cards}/>
            </div>
        </div>
    );
}

export default DogBattle;