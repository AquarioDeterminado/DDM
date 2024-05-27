import styles from './DogBattle.module.css';
import {useEffect, useState} from "react";
import Card from "../../components/Card/Card";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";
import CardHand from "../../components/CardHand/CardHand";
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

function DogBattle(props) {

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    const [activeCard, setActiveCard] = useState();

    const [cards, setCards] = useState({state: INFO_STATUS.LOADING});
    const [opponentCards, setOpponentCards] = useState({state: INFO_STATUS.LOADING});

    const [battleInfo, setBattleInfo] = useState({state: INFO_STATUS.LOADING});
    const [opponentInfo, setOpponentInfo] = useState({state: INFO_STATUS.LOADING});
    const [playerInfo, setPlayerInfo] = useState({state: INFO_STATUS.LOADING});
    const [update, setUpdate] = useState(false);

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
        setCards({state: INFO_STATUS.READY, cards: {playerCards: [{id: 1, name: "Card1", hp: 100, photo: "https://via.placeholder.com/150"}, {id: 2, name: "Card2", hp: 100, photo: "https://via.placeholder.com/150"}], playerPlayed: []}});
        setOpponentCards({state: INFO_STATUS.READY, cards: {playerCards: [{id: 1, name: "Card1", hp: 100, photo: "https://via.placeholder.com/150"}], playerPlayed: []}});


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

    function handleDragStart(event, setActiveCard) {
        const { active } = event;
        const { id } = active;

        console.log(event);

        for (let card in cards.playerCards) {
            if (card.id === id) {
                setActiveCard(card);
                break;
            }
        }
    }

    function handleDragOver(event) {
        const { active, over, draggingRect } = event;
        const { id } = active;
        const { id: overId } = over;

        // Find the containers
        const activeContainer = findContainer(id, cards);
        const overContainer = findContainer(overId, cards);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer ||
            overContainer === "playerCardSlot" && cards[overContainer].length >= 1
        ) {
            return;
        }

        setCards((prev) => {

            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

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
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((item) => item.id !== active.id)
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    activeCard,
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            };
        });
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;

        const activeContainer = findContainer(id, cards);
        const overContainer = findContainer(overId, cards);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = cards[activeContainer].indexOf(active.id);
        const overIndex = cards[overContainer].indexOf(overId);

        if (activeIndex !== overIndex) {
            setCards((cards) => ({
                ...cards,
                [overContainer]: arrayMove(cards[overContainer], activeIndex, overIndex)
            }));
        }

        setActiveCard(null);
    }

    return(
        <DndContext
            announcements={defaultAnnouncements}
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={(event) => handleDragStart(event, setActiveCard)}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}>
            <div className={styles.dogBattle}>
                <div className={styles.opponentSide}>
                    <PlayerFigthingInfo playerInfo={opponentInfo} styles={opponentInfoStyle} />
                    <CardHand cards={opponentCards.playerCards} id={"opponentCards"} isContainer={false}/>
                </div>

                <div className={styles.battleField}>
                    <div className={styles.battleField__user}>
                        <CardSlot card={cards.playerPlayed} id={"playerCardSlot"} isContainer={true}/>
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
                    <CardHand cards={cards.playerCards} isContainer={true} id={"playerCards"}/>
                </div>
            </div>
    </DndContext>);
}

export default DogBattle;