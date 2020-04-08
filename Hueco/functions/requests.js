export async function fetchGet(apiRoute, access_token){
    let response = await fetch(apiRoute, {
        headers: {
            'Authorization': 'Bearer ' + access_token,
        }
        })
        .then((response) => response.json())
        .catch((err) => alert('error in FetchGet' + err))
        .done();
    return response
}

export function fetchPost(){

    
}