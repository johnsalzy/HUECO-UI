import store from '../redux/store';

async function handleError(err){
  console.log('I will handle the error' + err)

  return {status: false}
}

export async function fetchGet(apiRoute) {
  const state = store.getState();     // grab current state
  const baseAPI = state.api.baseAPI
  const access_token = state.login.access_token;
  let response = await fetch(baseAPI + apiRoute, {
    headers: {
        'Authorization': 'Bearer ' + access_token,
    }
    })
    .then((response) => response.json())
    .catch((err) => handleError(err))
  return response
}


export async function fetchPost(apiRoute, body){
  const state = store.getState();
  const baseAPI = state.api.baseAPI
  const access_token = state.login.access_token;
  let response = await fetch(baseAPI + apiRoute, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
  })
  .then(response => response.json())
  .catch((err) => handleError(err));
  return response
}

export async function fetchDelete(apiRoute){
  const state = store.getState();
  const baseAPI = state.api.baseAPI
  const access_token = state.login.access_token;
  apiRoute = baseAPI + apiRoute
  let response = await fetch(apiRoute, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + access_token,
      }
  })
  .then(response => response.json())
  .catch((err) => handleError(err));
  return response
}

export async function fetchPatchMedia(apiRoute, body){
  const state = store.getState();
  const baseAPI = state.api.baseAPI
  const access_token = state.login.access_token;

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json")
  myHeaders.append("Authorization", "Bearer " + access_token);
  myHeaders.append("Content-type", "multipart/form-data");

  apiRoute = baseAPI + apiRoute
  console.log(apiRoute, body)
  let response = await fetch(apiRoute, {
      method: 'PATCH',
      headers: myHeaders,
      body: body,
  })
  .then(response => response.json())
  .catch((err) => handleError(err));
  return response
}