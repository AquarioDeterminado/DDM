import styles from "./CardRow.module.css";
import {SortableCard} from "../Card/Card";
import {useDroppable} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";

function CardRow(props) {
    const {cards, id, isContainer} = props;

    const { setNodeRef } = useDroppable({
        id
    });

    console.log(cards)

    const cardRowHtml = (
        <div ref={setNodeRef} className={styles.cardRow}>
        {cards !== undefined ? cards.map((card) => {
                return (<SortableCard cardInfo={card} id={card.id} key={card.id} />
                )})
            : null}
        </div>
    );
    if (cards === undefined)
        return null;
    else
        return (

            <>
                {isContainer ?
                <SortableContext
                    id={id}
                    strategy={horizontalListSortingStrategy}
                    items={cards}>
                    {cardRowHtml}
                </SortableContext>
                    : cardRowHtml}

            </>
        );
}

export default CardRow;