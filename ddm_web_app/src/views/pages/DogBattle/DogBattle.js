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
import {getCurrentHand, getUserInfo} from "../../../controllers/UserController";
import {getOpponentInfo} from "../../../controllers/BattleController";
import {useLocation} from "react-router-dom";

function DogBattle(props) {

    const {state} = useLocation();
    const {playerId} = state;

    console.log(playerId)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );
    const [activeCard, setActiveCard] = useState();

    const [cards, setCards] = useState({state: INFO_STATUS.LOADING, cards: {playerCards: [], playerPlayed: []}});
    const [opponentCards, setOpponentCards] = useState({state: INFO_STATUS.LOADING, cards: {playerCards: [], playerPlayed: []}});

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


        getCurrentHand((response) => {
            setCards({state: INFO_STATUS.READY, cards: {playerCards: response.pack, playerPlayed: []}});
        });


        getUserInfo((info) => {
            setPlayerInfo({status: INFO_STATUS.READY, player: info.response.user});
        });

        getOpponentInfo(playerId ,(info) => {
            setOpponentInfo({status: INFO_STATUS.READY, player: info.response.opponentInfo});
            setOpponentCards({state: INFO_STATUS.READY, cards: {playerCards: info.response.currentDeck, playerPlayed: []}});
        });



    },[]);

    function handleDragStart(event, setActiveCard) {
        const { active } = event;
        const { id } = active;

        for (let card in cards.cards.playerCards) {
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
        const activeContainer = findContainer(id, cards.cards);
        const overContainer = findContainer(overId, cards.cards);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer ||
            overContainer === "playerCardSlot" && cards.cards[overContainer].length >= 1
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
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;

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
                    {opponentCards.state === INFO_STATUS.READY ?
                        <CardHand cards={opponentCards.cards.playerCards} id={"opponentCards"} isContainer={false}/>
                        : "Loading..."}
                </div>

                <div className={styles.battleField}>
                    <div className={styles.battleField__user}>
                        <CardSlot card={cards.cards.playerPlayed} id={"playerPlayed"} isContainer={true}/>
                    </div>

                    <div className={styles.battleField__battleState}>
                        Waiting for User
                    </div>

                    <div className={styles.battleField__opponent}>
                        <CardSlot card={undefined} id={"playerPlayed"} isContainer={false}/>
                    </div>
                </div>


                <div className={styles.userSide}>
                    <PlayerFigthingInfo playerInfo={playerInfo} styles={playerInfoStyle} />
                {cards.state === INFO_STATUS.READY ?
                    <CardHand cards={cards.cards.playerCards} isContainer={true} id={"playerCards"}/>
                    : "Loading..."}
                </div>
            </div>
    </DndContext>);
}

export default DogBattle;