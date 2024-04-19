import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../MakeRoutes";
import styles from "./BackButton.module.css"

function BackButton() {

	const navigate = useNavigate();

	function handleClick() {
		navigate(ROUTES.PLAYERPROFILE);
	}

	return (
		<div onClick={handleClick}>
			<img src="https://www.pngfind.com/pngs/m/139-1391483_png-file-svg-back-button-icon-png-transparent.png" alt="Button Image" className={styles.BackButtonImage}></img>
		</div>
	);
}

export default BackButton;
