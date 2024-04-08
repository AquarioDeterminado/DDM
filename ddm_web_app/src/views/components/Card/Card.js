import styles from './Card.module.css';

function Card(props) {
    return (
        <div className={styles.card}>
            <div className={styles.card__photo}>
                <img src={props.cardinfo.photo} alt={props.cardinfo.name} />
            </div>
            <div className={styles.card__info}>
                <h1>{props.cardinfo.name}</h1>
                <p>{props.cardinfo.hp}</p>
            </div>
        </div>
    );
}

export default Card;