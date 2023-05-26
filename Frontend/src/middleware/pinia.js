import { userStore } from '@/stores'


var payload = null
var tokenExp = null

function evaluate() {
  const user = userStore()

  if (localStorage.getItem('token')) {
    console.log('HAY TOKEN')
    payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1]))
    tokenExp = new Date(payload.exp * 1000)
  }
  console.log('payload', payload)

  const now = new Date(Date.now())
  console.log('AHORA', now.getTime(), 'TOKENEXP', tokenExp.getTime())
  if (localStorage.getItem('token')) {
    if (now > tokenExp) {
      return user.logout('tokenExp')
    }
    console.log(payload.data)
    if (!user.isLogged) {
      Object.keys(payload.data).forEach((key) => {
        
        console.log(key, payload.data[key])
        Object.keys(user)[key] = payload.data[key]
        if (payload.data[key] === '') {
          payload.data[key] = 'null'
        } else if (key==='img'){
          payload.data[key] = 'https://localhost:3000/uploads/'+payload.data[key] 
        }
        const cosit = `user.data.${key}`
        console.log(eval(`${cosit}="${payload.data[key]}"`))
        // console.log(Object.keys(user)[key]);
      })
      user.isLogged = true
    }
  }
}

export default evaluate
