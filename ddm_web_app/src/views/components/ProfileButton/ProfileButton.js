import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../MakeRoutes";

function ProfileButton() {

    const navigate = useNavigate();

    function handleClick() {
        navigate(ROUTES.PLAYERPROFILE);
    }

  return (
    <div onClick={handleClick}>
      <button >Profile</button>
    </div>
  );
}

export default ProfileButton;