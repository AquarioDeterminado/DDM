import styles from './Card.module.css';
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from  "@dnd-kit/utilities";

export function SortableCard(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div key={props.cardInfo.id} ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card cardInfo={props.cardInfo} />
        </div>
    );
}


function Card(props) {
    const {cardInfo} = props;
    if (cardInfo === undefined) {
        return null;
    } else
        return (
            <div className={styles.card} id={cardInfo.id}>
                <div className={styles.card__photo}>
                    <img src={cardInfo.photo} alt={cardInfo.name} />
                </div>
                <div className={styles.card__info}>
                    <h2>{cardInfo.name}</h2>
                    <p>{cardInfo.hp + " hp"}</p>
                    <p>{cardInfo.attack + " attq"}</p>
                </div>
            </div>
        );
}

export default Card;