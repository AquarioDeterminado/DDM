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

export {getBattleInfo, getCards, getPlayersInfo};