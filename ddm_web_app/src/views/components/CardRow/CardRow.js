import styles from "./CardRow.module.css";
import {SelectableCard, SortableCard} from "../Card/Card";
import {useDroppable} from "@dnd-kit/core";
import {horizontalListSortingStrategy, SortableContext} from "@dnd-kit/sortable";
import {useEffect, useState} from "react";

export function SelectableCardRow(props) {
    const {cards, id, isContainer, play} = props;

    const [selected, setSelected] = useState(null);

    const cardRowHtml = (
        <div className={styles.cardRow}>
            {cards !== undefined ? cards.map((card) => {
                return (<SelectableCard cardInfo={card} id={card.id} key={card.id} selected={selected} setSelected={setSelected} play={play} />
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

function CardRow(props) {
    const {cards, id, isContainer} = props;

    const { setNodeRef } = useDroppable({
        id
    });

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