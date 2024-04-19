import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../MakeRoutes";
import styles from "./SettingsButton.module.css"

function SettingsButton() {

	const navigate = useNavigate();

	function handleClick() {
		navigate(ROUTES.SETTINGSPAGE);
	}

	return (
		<div onClick={handleClick}>
			<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fweb%2F512%2FCog-1024.png&f=1&nofb=1&ipt=dcbd8ae70527af15a40d66354a51fde729d6e3af64458edf39f9af319b592d5a&ipo=images" alt="Button Image" className={styles.settingsImage}></img>
		</div>
	);
}

export default SettingsButton;
