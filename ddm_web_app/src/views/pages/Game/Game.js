import {ROUTES} from "../../MakeRoutes";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {isLoggedIn} from "../../../controllers/UserController";

function Game() {

    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuth() {
            if (await isLoggedIn()) {
                navigate(ROUTES.GAMEMAP);
            } else {
                navigate(ROUTES.LOGIN);
            }
        }

        checkAuth();
    }, [navigate]);

    return (
        <div>
            <h1>WELCOME TO DDM</h1>
        </div>
    );
}

export default Game;