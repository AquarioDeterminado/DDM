import styles from  "./CardHand.module.css";
import CardRow from "../CardRow/CardRow";

function CardHand(props) {

    const {onClick, cards, id, isContainer} = props;

    if(cards !== undefined)
        return (
            <div onClick={onClick} className={styles.cardHand}>
                <CardRow cards={cards} id={id} isContainer={isContainer}/>
            </div>
        );
    else
        return (<> </>);
}

export default CardHand;