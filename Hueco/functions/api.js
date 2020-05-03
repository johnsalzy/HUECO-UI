import store from '../redux/store';
import { refreshToken } from '../redux/actions/index'
async function handleError(err){
  console.log('I will handle the error' + err)

  return null
}

function checkToken(state){
    let experation = state.login.expires
    const now = Date.now()/1000;
    

    // If it is expired
    // let body = {
    //   client_id: 'NTMtzF7gzZPU9Ka35UFsDHvpR8e4D1Fy4OPRsurx',
    //   grant_type: 'refresh_token',
    //   refresh_token: state.login.refresh_token
    // }
    // const baseAPI = state.api.baseAPI
    // console.log('body', body)
    // let apiRoute = baseAPI + 'auth/token/'
    // console.log('api route: ' + apiRoute)
    // let response = fetch(apiRoute, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(body)
    // })
    // .then((response) => console.log('res json', response.json()))
    // .catch((err) => handleError(err));
    // console.log('response', response)
    // store.dispatch(refreshToken({access_token: 'sfasdfas433wfd'}))

    if(now >= experation){

      alert('Token is expired!                                    ' + now + '                           ' + experation)
    }

    return state.login.access_token
}

export async function fetchGet(apiRoute) {
  const state = store.getState();     // grab current state
  const baseAPI = state.api.baseAPI
  const access_token = await checkToken(state)
  if(! apiRoute.includes(baseAPI)){
    apiRoute = baseAPI + apiRoute
  }

  let response = await fetch(apiRoute, {
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
  const access_token = checkToken(state)
  let response = await fetch(baseAPI + apiRoute, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
  })
  // .then(response => response.json())
  .catch((err) => handleError(err));
  return response
}


export async function fetchPostMedia(apiRoute, body){
  const state = store.getState();
  const baseAPI = state.api.baseAPI
  const access_token = checkToken(state)
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json")
  myHeaders.append("Authorization", "Bearer " + access_token);
  myHeaders.append("Content-type", "multipart/form-data");
  let response = await fetch(baseAPI + apiRoute, {
      method: 'POST',
      headers: myHeaders,
      body: body
  })
  .catch((err) => handleError(err));
  return response
}


export async function fetchDelete(apiRoute){
  const state = store.getState();
  const baseAPI = state.api.baseAPI
  const access_token = await checkToken(state)
  apiRoute = baseAPI + apiRoute
  let response = await fetch(apiRoute, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + access_token,
      }
  })
  .catch((err) => handleError(err));
  return response
}

export async function fetchPatchMedia(apiRoute, body){
  const state = store.getState();
  const baseAPI = state.api.baseAPI
  const access_token = await checkToken(state)
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json")
  myHeaders.append("Authorization", "Bearer " + access_token);
  myHeaders.append("Content-type", "multipart/form-data");

  apiRoute = baseAPI + apiRoute
  
  let response = await fetch(apiRoute, {
      method: 'PATCH',
      headers: myHeaders,
      body: body,
  })
  .then(response => response.json())
  .catch((err) => handleError(err));
  return response
}