import { userStore } from '@/stores'


var payload = null


function evaluate() {
const user = userStore()
  if (localStorage.getItem('token')) {
    if (!user.isLogged) {
      payload = JSON.parse(atob(localStorage.getItem('token').split('.')[1])).data
      Object.keys(payload).forEach((key) => {
        Object.keys(user)[key] = payload[key]
        if(payload[key]===null){
          payload[key]='null'
          console.log(payload[key])
        }
        const cosit = `user.${key}`
        console.log(cosit)
        console.log(key, Object.keys(user)[key], payload[key])
        eval(`${cosit}='${payload[key]}'`)
        // console.log(Object.keys(user)[key]);
      })
      user.isLogged=true
    }
  }
}

export default evaluate