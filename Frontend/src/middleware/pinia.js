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
      user.logout('tokenExp')
    }
    console.log(payload.data)
    if (!user.isLogged) {
      console.log(payload.data)
      Object.keys(payload).forEach((key) => {
        Object.keys(user)[key] = payload[key]
        if (payload[key] === '') {
          payload[key] = 'null'
          console.log(payload[key])
        }
        const cosit = `user.${key}`
        console.log(cosit)
        console.log(key, Object.keys(user)[key], payload[key])
        eval(`${cosit}='${payload[key]}'`)
        // console.log(Object.keys(user)[key]);
      })
      user.isLogged = true
    }
  }
}

export default evaluate
