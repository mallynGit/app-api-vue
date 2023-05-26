import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers:  {Authorization: localStorage.getItem('token') ? `${localStorage.getItem('token')}` : console.log('no cabecera')} 
})

//api.defaults.headers = localStorage.getItem('token') ? {Authorization: `${localStorage.getItem('token')}`} : console.log('no cabecera')
console.log(api.defaults,'DESDE MIDDLEWARE AXIOS');
// api.interceptors.response.use(response => {
//     console.log('Response:', JSON.stringify(response, null, 2))
//     return response
//   })


export default api