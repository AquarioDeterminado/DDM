import styles from './Card.module.css';

function Card(props) {
    return (
        <div className={styles.card}>
            <div className={styles.card__photo}>
                <img src={props.cardInfo.photo} alt={props.cardInfo.name} />
            </div>
            <div className={styles.card__info}>
                <h2>{props.cardInfo.name}</h2>
                <p>{props.cardInfo.hp + " hp"}</p>
            </div>
        </div>
    );
}

export default Card;