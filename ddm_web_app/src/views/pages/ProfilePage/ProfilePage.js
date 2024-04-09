import React from 'react';
import styles from "./ProfilePage.module.css";

function Profile() {
    return (
		<div className = {styles.profileBox}>
			<div className={styles.profileName}>
				<h1 >Profile Name</h1>
			</div>
		</div>
	);
}

export default Profile;
