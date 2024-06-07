import {ROUTES} from "../views/MakeRoutes";

function movePlayerTo(coordinates, event, navigate) {
    //TODO: make movenment

    arrived(navigate, event);
}

function arrived(navigate, event) {
    navigate(ROUTES.DOGBATTLE, {
        state: {
            eventId: event.id,
            playerId: event.playerId,
        }
    });
}

export {movePlayerTo, arrived};


