import {useDroppable} from "@dnd-kit/core";
import styles from "../CardRow/CardRow.module.css";
import {SortableCard} from "../Card/Card";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";

function CardSlot(props) {
    const {card, id, isContainer} = props;

    const { setNodeRef } = useDroppable({
        id
    });

    const cardSlotHTML = (
        <div ref={setNodeRef} className={styles.cardSlot}>
            {card !== undefined ?  (<SortableCard cardInfo={card} id={card.id} key={card.id} />)
                : null}
        </div>
    );
    if (card === undefined)
        return null;
    else
        return (

            <>
                {isContainer ?
                    <SortableContext
                        id={id}
                        strategy={horizontalListSortingStrategy}
                        items={card}>
                        {cardSlotHTML}
                    </SortableContext>
                    : cardSlotHTML}

            </>
        );
}

export default CardSlot;