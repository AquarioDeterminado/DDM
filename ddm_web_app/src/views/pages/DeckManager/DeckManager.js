import {useEffect, useState} from "react";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";
import styles from "./DeckManager.module.css";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Card from "../../components/Card/Card";
import CardRow from "../../components/CardRow/CardRow";
import {
    closestCorners,
    defaultAnnouncements,
    DndContext,
    DragOverlay, KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {findContainer} from "../../../configs/dndkit/defaultConfigs";
import card from "../../components/Card/Card";
import {addCardToCurrentHand, removeFromCurrentHand, getCurrentHand, getStockCards} from "../../../controllers/UserController";

function DeckManager() {
    const [cards, setCards] = useState({state: INFO_STATUS.LOADING});

    const [activeCard, setActiveCard] = useState();
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );


    useEffect(() => {
        let currentHand;
        getCurrentHand((response, status) => {
            if (status === 200)
                currentHand = response.pack;
            else
                setCards({...cards, state: INFO_STATUS.ERROR})
        }).then(() => {
            console.log(currentHand)
            getStockCards((response, status) => {
                if (status === 200) {
                    let litter = response.litter;

                    for (let i = 0; i < litter.length; i++) {
                        for (let j = 0; j < currentHand.length; j++) {
                            if (litter[i].id === currentHand[j].id) {
                                litter.splice(i, 1);
                            }
                        }
                    }

                    setCards({currentHand: currentHand, stock: litter, state: INFO_STATUS.READY});
                } else
                    setCards({...cards, state: INFO_STATUS.ERROR})
            });
        });
    }, []);

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
            overContainer === "currentHand" && cards[overContainer].length >= 5
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

        if (overContainer === "stock") {
            removeFromCurrentHand(activeCard.id, (response, status) => {
                if (status === 200) {
                    console.log("Card removed from hand");
                } else {
                    console.error("Failed to remove card from hand");
                }
            });
        } else {
            addCardToCurrentHand(activeCard.id, (response, status) => {
                if (status === 200) {
                    console.log("Card added to current hand");
                } else {
                    console.error("Failed to add card to current hand");
                }
            });
        }

        if (activeIndex !== overIndex) {
            console.log(activeCard.id, overContainer)
            setCards((cards) => ({
                ...cards,
                [overContainer]: arrayMove(cards[overContainer], activeIndex, overIndex)
            }));



        }

        setActiveCard(null);
    }

    function handleDragStart(event) {
        const { active } = event;
        const { id } = active;

        console.log(event);

        for (let key in cards) {
            for (let card of cards[key]) {
                if (card.id === id) {
                    setActiveCard(card);
                    break;
                }
            }
        }

    }

    return (
        <div>
            <h1>Deck Manager</h1>
            <div className={styles.deckManager}>
                <DndContext
                    announcements={defaultAnnouncements}
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={(event) => handleDragStart(event, setActiveCard)}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    <h2>Current Hand</h2>
                    <CardRow id="currentHand" cards={cards.currentHand} isContainer={true} />

                    <h2>Stock</h2>
                    <CardRow id="stock" cards={cards.stock} isContainer={true}/>

                    <DragOverlay>{activeCard ? <Card cardInfo={activeCard}/> : null}</DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}

export default DeckManager;