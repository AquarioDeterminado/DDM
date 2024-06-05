async function getEvents(callback) {
    const authKey = 0;
    const request = new Request(process.env.REACT_APP_API_URL + "/events/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({authKey: "authkey"})
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

export {getEvents};