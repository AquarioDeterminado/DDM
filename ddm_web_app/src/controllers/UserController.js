import webReq from "./utils/WebRequest";

function logInAuth(authKey, after)  {
    const request =  new Request('http://localhost:3000/users/login/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({authKey: authKey}),
    });

    webReq.expect(request, after);
}

export async function logInUserPass(username, password, after)  {
    const request =  new Request('http://localhost:3000/users/login/', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({username: username, password: password})
    });

    webReq.expect(request, after);
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

const exports = {logInUserPass, logInAuth, keepAuthKey, isLoggedIn};
export default exports;