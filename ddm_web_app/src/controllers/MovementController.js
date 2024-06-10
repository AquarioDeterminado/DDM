import {ROUTES} from "../views/MakeRoutes";

function movePlayerTo(coordinates, navigate, event) {
    //TODO: make movenment

    arrived(navigate, event);
}

function hostEvent(navigate) {
    navigate(ROUTES.DOGBATTLE, {
        state: {
            isHosting: true,
        }
    });
}

function arrived(navigate, event) {
    navigate(ROUTES.DOGBATTLE, {
        state: {
            eventId: event.id,
            playerId: event.playerId,
            isHosting: false,
        }
    });
}

export {movePlayerTo, hostEvent};


