import axios from 'axios'


const api = axios.create({
    baseURL:'https://localhost:3000/',
})

api.interceptors.request.use(request => {
  console.log('token',localStorage.getItem('token'));
  if(localStorage.getItem('token')){
    request.headers.Authorization = (localStorage.getItem('token'))
  }
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  })
api.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2))
    return response
  })


export default api