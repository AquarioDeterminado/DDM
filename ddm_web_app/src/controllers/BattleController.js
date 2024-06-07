import webReq from "./utils/WebRequest";
import useWebSocket from "react-use-websocket";

function getBattleInfo(callback) {
    const request = new Request('/api/battle', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            data = {battleInfo: {
                    status: "Your Turn!",
                    turn: 1}
                    } //TODO: Remove this
            callback(data, status);
        });
}

function getCards(callback) {
    const request = new Request('/api/cards', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            data = {cards: {
                    status: "Your Turn!",
                    turn: 1}
            } //TODO: Remove this
            callback(data, status);
        });
}

function getPlayersInfo(callback) {
    const request = new Request('/api/player', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            res.json()
        })
        .then((data) => {
            callback(data, status);
        });
}

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



export {getBattleInfo, getCards, getPlayersInfo, getOpponentInfo};