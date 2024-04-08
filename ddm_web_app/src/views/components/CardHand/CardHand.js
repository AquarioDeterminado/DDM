import {ReactComponent as CardHandSVG} from "../../assets/CardHand.svg";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../MakeRoutes";
import styles from  "./CardHand.module.css";

function CardHand() {

    const navigate = useNavigate();

    function handleClick() {
        navigate(ROUTES.DECKMANAGER)
    }

  return (
    <div onClick={handleClick} className={styles.cardHand}>
      <CardHandSVG/>
    </div>
  );
}

export default CardHand;