import {ROUTES} from "../views/MakeRoutes";

function movePlayerTo(coordinates, navigate) {
    //TODO: make movenment
    arrived(navigate);
}

function arrived(navigate) {
    navigate(ROUTES.DOGBATTLE);
}

export {movePlayerTo, arrived};


