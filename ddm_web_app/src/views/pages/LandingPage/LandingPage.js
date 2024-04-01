import styles from './LandingPage.module.css';
import {ReactComponent as Card1} from "../../assets/Card1.svg";
import {ROUTES} from "../../MakeRoutes";
import {useNavigate} from "react-router-dom";

function DogCardHand() {
    return (
        <div className={styles.dogCardHand}>
            <Card1/>
        </div>
    );

}

function StartButton() {
    const navigate = useNavigate();

    function startGame() {
        navigate(ROUTES.GAME)
    }

    return (
        <div className={styles.startButton} onClick={startGame}>
            <button className={styles.startButton}>Start</button>
        </div>
    );
}

function FrontCover() {
    return(
        <div className={styles.frontCover}>
            <h1 className={styles.frontCover}>DDM</h1>
            <StartButton />
            <DogCardHand />
        </div>
    )
}

function LandingPage() {
    return (
        <>
            <FrontCover />
            <p> aosnd</p>
            <p> aosnd</p>
            <p> aosnd</p>
        </>
    );
}

export default LandingPage;