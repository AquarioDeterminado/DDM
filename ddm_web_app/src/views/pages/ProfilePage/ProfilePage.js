import React from 'react';
import styles from "./ProfilePage.module.css";
import { ReactComponent as Background1 } from "../../assets/Player-Profile-Background.svg";
import { ReactComponent as Button1 } from "../../assets/settings-button.svg";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../MakeRoutes";


function SettingsButton() {
	const navigate = useNavigate();

	function settingsButton() {
		navigate(ROUTES.SETTINGSPAGE)
	}

	return (
		<div className={styles.settingsButton} onClick={settingsButton}>
			<Button1/>

		</div>
	);
}

function InfoBox() {

	return (
		<div className={styles.infoBox}>
			<h1>Puddle_04</h1>
			<p>
				Email: teste@gmail.com
				<br/>
				Location: Santos
			</p>
			<div className={styles.statsBox}>
				<p>
					Stats:
					<div className={styles.statTable}>
						Matches Played: 105
						<br/>
						Matches Won: 73
						<br/>
						Favourite Dog: Oscar
						<br/>
						Worst Enemy: Mauricio_04
					</div>
				</p>
			</div>
		</div>
	);
}

function Profile() {
	return (
		<div className={styles.profilePage}>
			<SettingsButton />
			<Background1 className={styles.background}/>
			<InfoBox />

		</div>
	);
}

export default Profile;