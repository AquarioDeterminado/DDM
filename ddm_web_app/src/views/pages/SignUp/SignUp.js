import styles from "./SignUp.module.css";
import {ROUTES} from "../../MakeRoutes";
import {useNavigate} from "react-router-dom";
import {sendSignUpRequest} from "../../../controllers/UserController";

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
            sendSignUpRequest(newUser, (res, status) => {
                if (status === 200) {
                    navigate(ROUTES.LOGIN, {logInMessage: "Sign Up Successful! Please Verify Email."});
                } else if (status === 400) {
                    alert("User already exists");
                } else {
                    alert("Error signing up");
                }
            });
        }
    }

    return (
        <div className={styles.signup}>
            <h1>Sign Up</h1>
            <form onSubmit={onSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;