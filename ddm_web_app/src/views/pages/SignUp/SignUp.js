import styles from "./SignUp.module.css";
import {ROUTES} from "../../MakeRoutes";

function SignUp() {

    function onSubmit(event) {
        navigate(ROUTES.LOGIN);
    }

    return (
        <div className={styles.signup}>
            <h1>Sign Up</h1>
            <form>
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