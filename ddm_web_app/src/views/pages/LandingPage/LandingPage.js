import styles from './LandingPage.module.css';
import {ReactComponent as Card1} from "../../assets/Landing-Page-Hand-Deck.svg";
import {ReactComponent as Button1} from "../../assets/Start-Game-Button.svg";
import {ReactComponent as Title1} from "../../assets/Title-ddm.svg";
import {ROUTES} from "../../MakeRoutes";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

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
            <Button1/>

        </div>
    );
}

function FrontCover() {
    const {t, i18n} = useTranslation();
    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };
    return(
        <div className={styles.frontCover}>
            <DogCardHand />
            <Title1 className={styles.title}/>
            <StartButton />
        </div>
    )
}

function LandingPage() {
    return (
        <>
            <FrontCover />
        </>
    );
}

export default LandingPage;
