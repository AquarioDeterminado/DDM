import webReq from "./utils/WebRequest";
import useWebSocket from "react-use-websocket";

function getOpponentInfo (playerId, callback) {
    const request = new Request(process.env.REACT_APP_API_URL + '/cards/getopponentinfo/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({playerId: playerId})
    });

    webReq.expect(request, callback);
}



export {getOpponentInfo};