import webReq, {DDM_API_URL} from "./utils/WebRequest";

function logInAuth(authKey, after)  {
    const request =  new Request(DDM_API_URL + '/users/login/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({authKey: authKey}),
    });

    webReq.expect(request, after);
}

export async function logInUserPass(username, password, after)  {
    const request =  new Request(DDM_API_URL + '/users/login/', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({username: username, password: password})
    });

    await webReq.expect(request, after);
}

export function keepAuthKey(authKey) {
    localStorage.setItem("authKey", authKey);
}

export async function isLoggedIn() {
    //TODO: Remove this
    if (localStorage.getItem("authKey") === "override") {
        return true;
    }

    logInAuth(localStorage.getItem("authKey"), (res) => {
        return res.status === 200;
    });
}

export async function sendSignUpRequest(newUser, after) {
    const request =  new Request(DDM_API_URL + '/users/signup/', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(newUser)
    });

    await webReq.expect(request, after);
}

export async function getStockCards(after) {
    const request =  new Request(DDM_API_URL + '/cards/stock', {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' })
    });

    await webReq.expect(request, after);
}

export async function getCurrentHand(after) {
    const request =  new Request(DDM_API_URL + '/cards/hand', {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json' })
    });

    await webReq.expect(request, after);

}

const exports = {logInUserPass, logInAuth, keepAuthKey, isLoggedIn};
export default exports;