export async function fetchGet(apiRoute, access_token){
    let response = await fetch(apiRoute, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
        }
        })
        .then((response) => response.json())
        .catch((err) => alert('error in FetchGet' + err))
        // .done();
        // alert('request.js' + JSON.stringify(response))
    return response
}

export async function fetchPost(apiRoute, headers, body){
    let response = await fetch(apiRoute, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .catch((err) => alert('error in fetchPost' + err));
    return response
}

export async function fetchDelete(apiRoute, access_token){
    let response = await fetch(apiRoute, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + access_token,
        },
    })
    .then(response => response.json())
    .catch((err) => alert('error in fetchDelete' + err));
    return response
}