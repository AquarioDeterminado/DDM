
const getEvents = async () => {
    const events = await fetch(`http://localhost:3000/events/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }, 1000000)
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

const getAllUsers = async () => {
    const user = await fetch(`https://api.dogdm.pt:3000/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }, 1000000)
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err));

    console.log(user);

    let userList = "";
    for (let i = 0; i < user.users.length; i++) {
        userList += `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title> ${user.users[i].name}</h5>
                    <p class="card-text">${user.users[i].email}</p>
                </div>
            </div>
        `;
    }

    const userDiv = document.getElementById('users')
    userDiv.innerHTML = userList;
}