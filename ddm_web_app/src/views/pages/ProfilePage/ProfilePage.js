import React from 'react';
import styles from "./ProfilePage.module.css";
import SettingsButton from '../../components/SettingsButton/SettingsButton';

function Profile() {
	return (
		<div className={styles.profilePage}>
			<div className={styles.profileBox}>
				<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F12%2FAvatar-Profile-Vector-PNG-Photos.png&f=1&nofb=1&ipt=f897a2a71c94522dc8c81fbe08995205600a64057856c82463a12d2453f09927&ipo=images" className={styles.profileImage}></img>
				<div className={styles.profileInfo}>
					<div className={styles.profileName}>
						<h2 >Minion_Destroyer</h2>
						<p>
							Email: teste@gmail.com
							<br></br>
							Location: Santos
						</p>
					</div>
					<div className={styles.statsBox}>
						<p>Stats:
							<div className={styles.statTable}>
								Matches Played: 105
								<br></br>
								Matches Won: 73
								<br></br>
								Favourite Dog: Oscar
								<br></br>
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
	);
}

export default Profile;
