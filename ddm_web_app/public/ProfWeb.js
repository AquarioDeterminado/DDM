
const getEvents = async () => {
    const events = await fetch(`${process.env.REACT_APP_API_URL}/events/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err));

    console.log(events);

    let eventsList = "";
    for (let i = 0; i < events.events.length; i++) {
        eventsList += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title
                    ">${events.events[i].name}</h5>
                    <p class="card-text">${events.events[i].description}</p>
                </div>
            </div>
        `;
    }

    const eventsDiv = document.getElementById('events')
    eventsDiv.innerHTML = eventsList;
}