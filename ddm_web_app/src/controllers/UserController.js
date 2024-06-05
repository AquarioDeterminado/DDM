import webReq, {DDM_API_URL} from "./utils/WebRequest";

function logInAuth(authKey, after)  {
    const request =  new Request(process.env.REACT_APP_API_URL + '/authkey', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({authKey: authKey}),
    });

    webReq.expect(request, after);
}

export async function logInUserPass(email, password, after)  {
    const request =  new Request(process.env.REACT_APP_API_URL + '/users/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({email: email, password: password})
    });

    await webReq.expect(request, after);
}

export function keepAuthKey(authKey) {
    localStorage.setItem("authKey", authKey);
}

export async function isLoggedIn() {
    //TODO: Remove this
    let loggedIn;

    if (localStorage.getItem("authKey") !== null && localStorage.getItem("authKey") !== undefined ) {
        return true;
    } else {
        return false;
    }

    await logInAuth(localStorage.getItem("authKey"), (res) => {
        loggedIn = res.status === 200;
    });

    return loggedIn;
}

export async function sendSignUpRequest(newUser, after) {
    const request =  new Request(process.env.REACT_APP_API_URL + '/users/create/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userInfo: newUser}),
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            after(data, status);
        });
}

export async function getStockCards(after) {
    const request =  new Request(process.env.REACT_APP_API_URL + `/cards/litter/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({authKey: localStorage.getItem("authKey")}),
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            after(data, status);
        });
}

export async function getCurrentHand(after) {
    const request =  new Request(process.env.REACT_APP_API_URL + '/cards/currentpack/', {
        method: 'Post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({authKey: localStorage.getItem("authKey")}),
    });

    var status = 0;
    fetch(request)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((data) => {
            after(data, status);
        });

}

export function addCardToCurrentHand(cardId, after) {
    const request =  new Request(process.env.REACT_APP_API_URL + '/cards/currentpack/add/', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({authKey: localStorage.getItem("authKey"), cardId: cardId}),
    });

    webReq.expect(request, after);
}

export function removeFromCurrentHand(cardId, after) {
    const request =  new Request(process.env.REACT_APP_API_URL + '/cards/currentpack/remove/', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({authKey: localStorage.getItem("authKey"), cardId: cardId}),
    });

    webReq.expect(request, after);
}

export function getUserInfo(after) {
    const request =  new Request(process.env.REACT_APP_API_URL + '/users/', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({authKey: localStorage.getItem("authKey")}),
    });

    webReq.expect(request, after);
}

const exports = {logInUserPass, logInAuth, keepAuthKey, isLoggedIn, addCardToCurrentHand, addCardToStock: removeFromCurrentHand, sendSignUpRequest, getStockCards, getCurrentHand};
export default exports;