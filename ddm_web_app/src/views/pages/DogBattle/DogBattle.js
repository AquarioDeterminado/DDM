import styles from './DogBattle.module.css';
import {useEffect, useState} from "react";
import Card from "../../components/Card/Card";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";
import CardHand, {PlayerHand} from "../../components/CardHand/CardHand";
import PlayerFigthingInfo from "../../components/PlayerFigthingInfo/PlayerFigthingInfo";
import {
    closestCorners,
    defaultAnnouncements,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {findContainer} from "../../../configs/dndkit/defaultConfigs";
import CardSlot from "../../components/CardSlot/CardSlot";
import {getCurrentHand, getUserInfo} from "../../../controllers/UserController";
import {getOpponentInfo, startGameConnection} from "../../../controllers/BattleController";
import {useLocation, useNavigate} from "react-router-dom";
import {ROUTES} from "../../MakeRoutes";
import useWebSocket, {ReadyState} from "react-use-websocket";
import CardRow from "../../components/CardRow/CardRow";


function DogBattle(props) {

    const {state} = useLocation();
    const {eventId, playerId, isHosting} = state;

    const [authKey, setAuthKey] = useState(localStorage.getItem("authKey"));

    const WS_URL = `ws://localhost:8000/games/start/`
    const {sendJsonMessage, lastJsonMessage, readyState} = useWebSocket(
        WS_URL,
        {
            share: false,
            shouldReconnect: () => true,
        },
    );
    const navigate = useNavigate();


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    const [activeCard, setActiveCard] = useState();
    const [round, setRound] = useState(1);
    const [gameId, setGameId] = useState(null);

    const [cards, setCards] = useState({state: INFO_STATUS.LOADING, cards: {playerCards: [], playerPlayed: []}});
    const [opponentCards, setOpponentCards] = useState({
        state: INFO_STATUS.LOADING,
        cards: {playerCards: [], playerPlayed: []}
    });

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


    // Run when the connection state (readyState) changes
    useEffect(() => {
        console.log("Connection state changed")
        if (readyState === ReadyState.OPEN) {
            if (!isHosting)
                sendJsonMessage(
                    {
                        "action": "startGame",
                        "info": {
                            "authKey": localStorage.getItem("authKey"),
                            "eventId": eventId
                        }
                    });
            else {
                setBattleInfo({state: INFO_STATUS.READY, battleInfo: "Waiting for opponent..."});
            }
        } else {
            console.log("Connection state: " + readyState);
        }
    }, [readyState])

    // Run when a new WebSocket message is received (lastJsonMessage)
    useEffect(() => {
        if (!lastJsonMessage) return;

        if (lastJsonMessage.status - 200 < 0 && lastJsonMessage.status - 200 <= 100) alert("Error: " + lastJsonMessage.message);

        console.log(lastJsonMessage);
        if (lastJsonMessage.message === "Enemy Entered Match") {
            setBattleInfo({state: INFO_STATUS.READY, battleInfo: lastJsonMessage.player.nickname + "Entered Match"});
            setGameId(lastJsonMessage.gameId);
            getOpponentInfo(lastJsonMessage.player.id, (info) => {
                setOpponentInfo({status: INFO_STATUS.READY, player: info.response.opponentInfo});
                setOpponentCards({
                    state: INFO_STATUS.READY,
                    cards: {playerCards: info.response.currentDeck, playerPlayed: []}
                });
            });
        }

        if (lastJsonMessage.message === "Game started successfully") {
            setBattleInfo({state: INFO_STATUS.READY, battleInfo: "Game Started!"});
            setGameId(lastJsonMessage.gameId);

            setTimeout(() => {
                setBattleInfo({state: INFO_STATUS.READY, battleInfo: "Play!"});
            }, 2 * 1000);
        }


        if (lastJsonMessage.message === "Play made successfully") {
            setBattleInfo({state: INFO_STATUS.READY, battleInfo: "waiting for opponent to play"});
        }

        if (lastJsonMessage.message === "Not your turn") {
            setBattleInfo((prev) => {
                    setTimeout(() => {
                        setBattleInfo({state: INFO_STATUS.READY, battleInfo: "waiting for opponent to play"});
                    }, 2 * 1000);
                    return {state: INFO_STATUS.READY, battleInfo: "Not your turn"}

                }
            );
        }

        if (lastJsonMessage.message === "Your Turn") {
            setBattleInfo({state: INFO_STATUS.READY, battleInfo: "Your Turn"});
        }

        if (lastJsonMessage.message === "Round finished") {
            setBattleInfo({state: INFO_STATUS.READY, battleInfo: "Round finished"});
            setPlayerInfo({status: INFO_STATUS.READY, player: {...playerInfo.player, hp: lastJsonMessage.player1_hp}});
            setOpponentInfo({
                status: INFO_STATUS.READY,
                player: {...opponentInfo.player, hp: lastJsonMessage.player2_hp}
            });
            setRound(round + 1);

            setTimeout(() => {
                setBattleInfo({state: INFO_STATUS.READY, battleInfo: "Play!"});

            }, 5 * 1000);
        }

        if (lastJsonMessage.message === "You Won") {
            setBattleInfo({state: INFO_STATUS.READY, battleInfo: "You Won"});
            setTimeout(() => {
                navigate(ROUTES.GAMEMAP);
            }, 5 * 1000);
        }

        if (lastJsonMessage.message === "You Lost") {
            setBattleInfo({state: INFO_STATUS.READY, battleInfo: "You Lost"});
            setTimeout(() => {
                navigate(ROUTES.GAMEMAP);
            }, 5 * 1000);
        }

        if (lastJsonMessage.message === "Draw") {
            setBattleInfo({state: INFO_STATUS.READY, battleInfo: "Draw"});
            setTimeout(() => {
                navigate(ROUTES.GAMEMAP);
            }, 5 * 1000);
        }


    }, [lastJsonMessage])

    function play(cardId) {
        sendJsonMessage(
            {
                "action": "play",
                "info": {
                    "authKey": authKey,
                    "round": round,
                    "gameId": gameId,
                    "cardId": cardId
                }
            });

        setBattleInfo({state: INFO_STATUS.READY, battleInfo: "Playing..."})

    }

    useEffect(() => {

        /*
        getBattleInfo((info) => {
            setBattleInfo(info);
            //TODO: Implement Welcome Screen: Etc;
        });*/


        setAuthKey(localStorage.getItem("authKey"));


        getCurrentHand(authKey, (response) => {
            setCards({state: INFO_STATUS.READY, cards: {playerCards: response.pack, playerPlayed: []}});
        });


        getUserInfo(authKey,(info) => {
            setPlayerInfo({status: INFO_STATUS.READY, player: info.response.user});
        });

        if (!isHosting) {
            getOpponentInfo(playerId, (info) => {
                setOpponentInfo({status: INFO_STATUS.READY, player: info.response.opponentInfo});
                setOpponentCards({
                    state: INFO_STATUS.READY,
                    cards: {playerCards: info.response.currentDeck, playerPlayed: []}
                });
            });
        }
    }, []);

    function handleDragStart(event, setActiveCard) {
        const {active} = event;
        const {id} = active;

        for (let card in cards.cards.playerCards) {
            if (card.id === id) {
                setActiveCard(card);
                break;
            }
        }
    }

    function handleDragOver(event) {
        const {active, over, draggingRect} = event;
        const {id} = active;
        const {id: overId} = over;

        // Find the containers
        const activeContainer = findContainer(id, cards.cards);
        const overContainer = findContainer(overId, cards.cards);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer ||
            overContainer === "playerPlayed" && cards.cards[overContainer].length >= 1
        ) {
            return;
        }

        setCards((prev) => {

            const activeItems = prev.cards[activeContainer];
            const overItems = prev.cards[overContainer];

            // Find the indexes for the items
            const activeIndex = activeItems.indexOf(id);
            const overIndex = overItems.indexOf(overId);

            let newIndex;
            if (overId in prev) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem =
                    over &&
                    overIndex === overItems.length - 1 &&
                    draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev.cards,
                [activeContainer]: [
                    ...prev.cards[activeContainer].filter((item) => item.id !== active.id)
                ],
                [overContainer]: [
                    ...prev.cards[overContainer].slice(0, newIndex),
                    activeCard,
                    ...prev.cards[overContainer].slice(newIndex, prev.cards[overContainer].length)
                ]
            };
        });
    }

    function handleDragEnd(event) {
        const {active, over} = event;
        const {id} = active;
        const {id: overId} = over;

        const activeContainer = findContainer(id, cards.cards);
        const overContainer = findContainer(overId, cards.cards);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = cards.cards[activeContainer].indexOf(active.id);
        const overIndex = cards.cards[overContainer].indexOf(overId);

        if (activeIndex !== overIndex) {
            setCards((cards) => ({
                ...cards.cards,
                [overContainer]: arrayMove(cards.cards[overContainer], activeIndex, overIndex)
            }));
        }

        setActiveCard(null);
    }

    return (
        <DndContext
            announcements={defaultAnnouncements}
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={(event) => handleDragStart(event, setActiveCard)}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}>
            <div className={styles.dogBattle}>
                <div className={styles.opponentSide}>
                    <PlayerFigthingInfo playerInfo={opponentInfo} styles={opponentInfoStyle}/>
                    {opponentCards.state === INFO_STATUS.READY ?
                        <CardHand cards={opponentCards.cards.playerCards} id={"opponentCards"} isContainer={false}/>
                        : "Loading..."}
                </div>

                <div className={styles.battleField}>
                    <div className={styles.battleField__user}>
                        {cards.state === INFO_STATUS.READY ?
                            <CardRow id="playerPlayed" cards={cards.cards.playerPlayed} isContainer={true}/>
                            : null}
                    </div>

                    <div className={styles.battleField__battleState}>
                        {battleInfo.state === INFO_STATUS.READY ? battleInfo.battleInfo : "Loading..."}
                    </div>

                    <div className={styles.battleField__opponent}>
                        {opponentCards.state === INFO_STATUS.READY ?
                            <CardSlot card={null} id={"playerPlayed"} isContainer={false}/>
                            : null}
                    </div>
                </div>


                <div className={styles.userSide}>
                    <PlayerFigthingInfo playerInfo={playerInfo} styles={playerInfoStyle}/>

                    {cards.state === INFO_STATUS.READY ?
                        <PlayerHand play={play} cards={cards.cards.playerCards} isContainer={true} id={"playerCards"}/>
                        : "Loading..."}
                </div>
            </div>
        </DndContext>);
}

export default DogBattle;