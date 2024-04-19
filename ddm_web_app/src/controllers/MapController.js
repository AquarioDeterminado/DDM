async function getEvents(callback) {
    const request = new Request('/api/events/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
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