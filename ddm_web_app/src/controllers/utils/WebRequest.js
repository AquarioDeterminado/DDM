const API_URL = "http://localhost:5000";
22
export async function expect(request, after) {
    try {
        await fetch(request).then( (response) => {
            const status = response.status;
            response.json().then(
                (res) => after({response: res, status: status})
            );
        });
    } catch (error) {
        console.log("Error fetching data", error)
        after({error: error});
    }
}

const WebRequest = {expect: expect};
export default WebRequest;