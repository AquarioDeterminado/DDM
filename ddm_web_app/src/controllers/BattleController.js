function getBattleInfo(callback) {
    const request = new Request('/api/battle', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    fetch(request)
        .then((res) => {
            const status = res.status;
            return res.json()
        })
        .then((data) => {
            callback(data);
        });
}

function getCards(callback) {
    const request = new Request('/api/cards', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    fetch(request)
        .then((res) => {
            const status = res.status;
            return res.json()
        })
        .then((data) => {
            callback(data);
        });
}

function getPlayersInfo(callback) {
    const request = new Request('/api/player', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    fetch(request)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        });
}

export {getBattleInfo, getCards, getPlayersInfo};