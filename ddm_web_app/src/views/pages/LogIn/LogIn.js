import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../MakeRoutes";
import { keepAuthKey, logInUserPass } from "../../../controllers/UserController";
import {ReactComponent as Button1} from "../../assets/Login-Button.svg";
import {ReactComponent as Title1} from "../../assets/Sign-In-Title.svg";

import styles from "./LogIn.module.css";

function LogIn() {
	const navigate = useNavigate();

	function onSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		const email = data.get('email');
		const password = data.get('password');
		const rememberMe = data.get('rememberMe');

		//TODO: Remove this
		if (email === "admin" && password === "123") {
			if (rememberMe)
				keepAuthKey("override");
			navigate(ROUTES.GAME);
			return;
		}

		logInUserPass(email, password,
			(response) => {
				if (response.status === 200) {
					if (rememberMe) {
						keepAuthKey(response.response.authKey);
					}

					navigate(ROUTES.GAME);
				} else {
					alert(response.response.message);
				}
			});
	}

	function LoginButton() {
		return (
			<div className={styles.submitButton} >
				<Button1/>

			</div>
		);
	}

	return (
		<div className={styles.logInPage}>
			<Title1 className={styles.container} />
			<form className={styles.logInForm} onSubmit={onSubmit}>
				<label className={styles.logInForm} id={styles["usernameInputBox"]}>
					<input type="text" placeholder={"Email"} name="email" />
				</label>
				<label className={styles.logInForm} id={styles["passwordInputBox"]}>
					<input type="password" placeholder={"Password"} name="password" />
				</label>
				<label className={styles.logInForm} id={styles["rememberMeCheckBox"]}>
					Remember Me
					<input type="checkbox" name="rememberMe" />
				</label>
				<button type="submit" >
					<LoginButton />
				</button>
				<label className={styles.logInForm} id={styles["signUpButton"]}>
					<a href={ROUTES.SIGNUP} >Sign Up</a>
				</label>
			</form>
		</div>
	)
}

export default LogIn;
