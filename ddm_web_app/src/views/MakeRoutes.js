import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Game from "./pages/Game/Game";
import LogIn from "./pages/LogIn/LogIn";
import GameMap from "./pages/GameMap/GameMap";

const gameBaseRoute = "/game";

const ROUTES  = {
    LANDING: "/",

    LOGIN: "/login",
    SIGNUP: "/signup",

    GAME: gameBaseRoute,
    GAMEMAP: gameBaseRoute + "/map",
    DECKMANAGER: gameBaseRoute + "/deck",
    PLAYERPROFILE: gameBaseRoute  + "/profile",

    DASHBOARD: "/dashboard",
}

function makeRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.LANDING} element={<LandingPage />} />
                <Route path={ROUTES.LOGIN} element={<LogIn />}/>
                <Route path={ROUTES.SIGNUP} <SignUp /> />

                <Route path={ROUTES.GAME} element={<Game />}/>\
                <Route path={ROUTES.GAMEMAP} element={<GameMap />} />
                <Route path={ROUTES.DECKMANAGER} element={<DeckManager />} />
                <Route path={ROUTES.PLAYERPROFILE} element={<ProfilePage />} />

                <Route path={ROUTES.DASHBOARD} element={<GameDashBoard />}/>
            </Routes>
        </BrowserRouter>
    );
}

export {makeRoutes, ROUTES};
export default makeRoutes;