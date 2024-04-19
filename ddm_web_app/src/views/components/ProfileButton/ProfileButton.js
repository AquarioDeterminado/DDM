import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../MakeRoutes";
import styles from "./ProfileButton.module.css"

function ProfileButton() {

    const navigate = useNavigate();

    function handleClick() {
        navigate(ROUTES.PLAYERPROFILE);
    }

  return (
      <div onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={styles.profileSVG}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path stroke="currentColor" strokeWidth="2" d="M5.25 19.25C7.08243 17.8447 9.43467 17 12 17C14.5653 17 16.9176 17.8447 18.75 19.25"/>
              <circle cx="12" cy="10.25" r="3.25" stroke="currentColor" strokeWidth="2"/>
          </svg>
    </div>
  );
}

export default ProfileButton;
