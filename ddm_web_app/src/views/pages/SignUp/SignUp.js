import styles from "./SignUp.module.css";
import { ROUTES } from "../../MakeRoutes";
import { useNavigate } from "react-router-dom";
import { sendSignUpRequest } from "../../../controllers/UserController";

function SignUp() {

	const navigate = useNavigate();

	function onSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const newUser = {
			username: formData.get("username"),
			email: formData.get("email"),
			password: formData.get("password"),
			confirmPassword: formData.get("confirmPassword")
		}

		if (!newUser.username ||
			!newUser.email ||
			!newUser.password ||
			!newUser.confirmPassword) {
			alert("Please fill in all fields");
		} else if (newUser.password !== newUser.confirmPassword) {
			alert("Passwords do not match");
		} else {
			sendSignUpRequest({nickname: newUser.username, email: newUser.email, password: newUser.password}, (res, status) => {
				if (status === 200) {
					navigate(ROUTES.LOGIN, { logInMessage: "Sign Up Successful! Please Verify Email." });
				} else if (status === 400) {
					alert(res.message);
				} else {
					alert("Error signing up");
				}
			});
		}
	}

	return (
		<div className={styles.signUp}>
			<h1>Sign Up</h1>
			<form ClassName={styles.SignUpForm} onSubmit={onSubmit}>
				<label className={styles.SignUpForm} id={styles["usernameInputBox"]}>
					<input type="text" id="username" name="username" placeholder="Username" />
				</label>
				<label className={styles.SignUpForm} id={styles["usernameInputBox"]}>
					<input type="email" id="email" name="email" placeholder="Email" />
				</label>
				<label className={styles.SignUpForm} id={styles["usernameInputBox"]}>
					<input type="password" id="password" name="password" placeholder="Password" />
				</label>
				<label className={styles.SignUpForm} id={styles["usernameInputBox"]}>
					<input type="password" id="confirmPassword" name="confirmPassword" placeholder="Password" />
				</label>
				<button className={styles.SignUpForm} id={styles["signUpButton"]}>Sign Up</button>
			</form>
		</div>
	)
}

export default SignUp;
