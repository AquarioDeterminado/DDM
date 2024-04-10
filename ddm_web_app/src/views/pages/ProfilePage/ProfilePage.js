import React from 'react';
import styles from "./ProfilePage.module.css";

function Profile() {
	return (
		<div className={styles.profileBox}>
			<div className={styles.profileHeader}>
				<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F12%2FAvatar-Profile-Vector-PNG-Photos.png&f=1&nofb=1&ipt=f897a2a71c94522dc8c81fbe08995205600a64057856c82463a12d2453f09927&ipo=images" className={styles.image}></img>
				<div className={styles.profileName}>
					<h2 >Profile Name</h2>
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
				<div className={styles.statsRow}>
					<div className={styles.stat}>
					<p className={styles.statsInfo}>
							Stat 3
							<button>+</button>
							<button>-</button>
						</p>
					</div>
					<div className={styles.stat}>
					<p className={styles.statsInfo}>
							Stat 4
							<button>+</button>
							<button>-</button>
						</p>
					</div>
				</div>
				<div className={styles.statsRow}>
					<div className={styles.stat}>
					<p className={styles.statsInfo}>
							Stat 5
							<button>+</button>
							<button>-</button>
						</p>
					</div>
					<div className={styles.stat}>
					<p className={styles.statsInfo}>
							Stat 6
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
