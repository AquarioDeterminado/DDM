import React, { useState } from 'react';
import styles from "./SettingsPage.module.css";
import BackButton from '../../components/BackButton/BackButton';
import {ROUTES} from "../../MakeRoutes";


function Settings() {
	const [username, setUsername] = useState('');
	const [difficulty, setDifficulty] = useState('easy');
	const [soundEnabled, setSoundEnabled] = useState(false);

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleDifficultyChange = (event) => {
		setDifficulty(event.target.value);
	};

	const handleSoundToggle = () => {
		setSoundEnabled(!soundEnabled);
	};

	const handleSaveSettings = (event) => {
		event.preventDefault();
		//NEED TO ADD SAVES TO THE DB
	};

	return (
 		<div className={styles.settingsPage}>
			<div className={styles.settingsBox}>
				<div className={styles.backButton}>
					<BackButton />
				</div>
				<div className={styles.SettingsInfo}>
					<div className={styles.settingsTitle}>
						<h1>Game Settings</h1>
					</div>
					<form onSubmit={handleSaveSettings}>
						<div className={styles.settingsOptions}>
							<label htmlFor="username">Username:</label>
							<input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />


							<label htmlFor="difficulty">Difficulty:</label>
							<select id="difficulty" name="difficulty" value={difficulty} onChange={handleDifficultyChange}>
								<option value="easy">Easy</option>
								<option value="medium">Medium</option>
								<option value="hard">Hard</option>
							</select>
							<div className={styles.Sound}>
								<label htmlFor="sound">Enable Sound </label>
								<input type="checkbox" id="sound" name="sound" checked={soundEnabled} onChange={handleSoundToggle} />
							</div>
						</div>
						<div className={styles.buttons}>
							<button type="submit" className={styles.saveButton}>Save Settings</button>
							<button type="submit" onClick={() => {
								localStorage.clear();
								window.location.href = ROUTES.LOGIN;
							}} className={styles.logOffButton}>Log Out</button>

						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Settings;
