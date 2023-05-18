import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: localStorage.getItem('token') ? `Authorization: ${localStorage.getItem('token')}` : console.log('no cabecera')
})

// api.interceptors.request.use(request => {
//   console.log("CABECERAS AXIOS",request.headers);
// })
// api.interceptors.response.use(response => {
//     console.log('Response:', JSON.stringify(response, null, 2))
//     return response
//   })


export default api