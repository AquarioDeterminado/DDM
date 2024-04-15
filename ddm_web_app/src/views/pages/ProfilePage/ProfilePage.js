import React from 'react';
import styles from "./ProfilePage.module.css";

function Profile() {
	return (
		<div className={styles.profileBox}>
			<div className={styles.profileHeader}>
				<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F12%2FAvatar-Profile-Vector-PNG-Photos.png&f=1&nofb=1&ipt=f897a2a71c94522dc8c81fbe08995205600a64057856c82463a12d2453f09927&ipo=images" className={styles.profileImage}></img>
				<div className={styles.headerInfo}>
					<div className={styles.profileName}>
						<h2 >Profile Name</h2>
					</div>
					<div className={styles.settingsButton}>
						<button class="button-with-image">
							<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fmusic-ui-solid-24px%2F24%2Fsettings-3-1024.png&f=1&nofb=1&ipt=1f374e108082aa07d2a40c99a578bb9a1afc721af7487f45e7340f53fdb0f7af&ipo=images" alt="Button Image" className={styles.settingsImage}></img>
						</button>
					</div>
				</div>
			</div>
			<div className={styles.statTable}>
				<div className={styles.statsRow}>
					<div className={styles.stat}>
						<p className={styles.statsInfo}>
							Stat 1
							<button>+</button>
							<button>-</button>
						</p>
					</div>
					<div className={styles.stat}>
						<p className={styles.statsInfo}>
							Stat 2
							<button>+</button>
							<button>-</button>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
