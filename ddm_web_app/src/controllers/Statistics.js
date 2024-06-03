/**
 * Objetivos Estatistica:
 *  - Utilizadores por Zona (Gráfico de barras)
 *  - Nº uilixadore por tempo (Historograma)
 *  - Grafico circular genero
 *
 *  - Probabilidade de um utilizador ganhar um jogo
 *  - Jogador com mais vitorias (nome e quantidade) (fazer “a mão” Aka js)
 *  - Jogador com menos vitorias (nome e quantidade) (fazer “a mão” Aka js)
 */

function getUsersByZone(callback) {
    const request = new Request(process.env.REACT_APP_API_URL + "/statistics/userbyzone/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            callback(data, status);
        });
}

function getUsersByTime(callback) {
    const request = new Request(process.env.REACT_APP_API_URL + "/statistics/userbytime/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            callback(data, status);
        });

}

function getUsersByGender(callback) {
    const request = new Request(process.env.REACT_APP_API_URL + "/statistics/getgenderstats/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            callback(data, status);
        });

}

function getWinningProbability(callback, userId) {
    const request = new Request(process.env.REACT_APP_API_URL + "/statistics/getwinprob/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: userId})
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            callback(data, status);
        });

}

function getMostWins(callback) {
    const request = new Request(process.env.REACT_APP_API_URL + "/statistics/getmostwins/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            callback(data, status);
        });

}

function getLessWins(callback) {
    const request = new Request(process.env.REACT_APP_API_URL + "/statistics/getlesswins/", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            callback(data, status);
        });

}
