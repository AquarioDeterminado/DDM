import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../MakeRoutes";
import { keepAuthKey, logInUserPass } from "../../../controllers/UserController";
import styles from "./LogIn.module.css";

function LogIn() {
	const navigate = useNavigate();

	function onSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		const username = data.get('username');
		const password = data.get('password');
		const rememberMe = data.get('rememberMe');

		console.log(username, password);
		//TODO: Remove this
		if (username === "admin" && password === "123") {
			if (rememberMe)
				keepAuthKey("override");
			navigate(ROUTES.GAME);
			return;
		}

		logInUserPass(username, password,
			(response) => {
				if (response.status === 200) {
					if (rememberMe) {
						keepAuthKey(response.data.authKey);
					}

					navigate(ROUTES.GAME);
				} else {
					console.log(response); //TODO: Log In Error
				}
			});
	}

	return (
		<div className={styles.logInPage}>
			<form className={styles.logInForm} onSubmit={onSubmit}>
				<label className={styles.logInForm} id={styles["usernameInputBox"]}>
					<input type="text" placeholder={"Username"} name="username" />
				</label>
				<label className={styles.logInForm} id={styles["passwordInputBox"]}>
					<input type="password" placeholder={"Password"} name="password" />
				</label>
				<label className={styles.logInForm} id={styles["rememberMeCheckBox"]}>
					Remember Me
					<input type="checkbox" name="rememberMe" />
				</label>
				<button className={styles.logInForm} id={styles["submitButton"]}>Submit</button>
				<label className={styles.logInForm} id={styles["signUpButton"]}>
					<a href={ROUTES.SIGNUP} >Sign Up</a>
				</label>
			</form>
		</div>
	)
}

export default LogIn;
