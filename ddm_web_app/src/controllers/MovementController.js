import {ROUTES} from "../views/MakeRoutes";

function movePlayerTo(coordinates, playerId, navigate) {
    //TODO: make movenment

    arrived(navigate, playerId);
}

function arrived(navigate, playerId) {
    console.log(playerId)
    navigate(ROUTES.DOGBATTLE, {
        state: {playerId: playerId}
    });
}

export {movePlayerTo, arrived};


