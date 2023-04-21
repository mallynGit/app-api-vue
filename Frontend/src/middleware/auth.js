import api from './axios'

async function verifyAuthToken(token) {
  if (token === null) {
    return false
  }

  api.post('auth', null, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

function checkToken() {
  if (localStorage.getItem('token')) {
    return true
  } else {
    return false
  }
}

function routerMiddleware(to, from){
  const token = localStorage.getItem('token')
  if(token){
    to.meta.config = {}
  }
}
export default { checkToken, verifyAuthToken, routerMiddleware }
