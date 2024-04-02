import {ReactComponent as CardHandSVG} from "../../assets/CardHand.svg";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../MakeRoutes";

function CardHand() {

    const navigate = useNavigate();

    function handleClick() {
        navigate(ROUTES.DECKMANAGER)
    }

  return (
    <div onClick={handleClick}>
      <CardHandSVG/>
    </div>
  );
}

export default CardHand;