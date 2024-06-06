import React from 'react';
import styles from "./ProfilePage.module.css";
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import { ReactComponent as Background1 } from "../../assets/Player-Profile-Background.svg";

function Profile() {
	return (
		<div className={styles.background}>
			<Background1 className={styles.centeredBackground} />
			<div className={styles.profilePage}>
				<div className={styles.profileBox}>
					<div className={styles.profileInfo}>

							<h1>Puddle_04</h1>
							<p>
								Email: teste@gmail.com
								<br />
								Location: Santos
							</p>

						<div className={styles.statsBox}>
							<p>
								Stats:
								<div className={styles.statTable}>
									Matches Played: 105
									<br />
									Matches Won: 73
									<br />
									Favourite Dog: Oscar
									<br />
									Worst Enemy: Mauricio_04
								</div>
							</p>
						</div>
					</div>
					<div className={styles.settingsButton}>
						<SettingsButton />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
