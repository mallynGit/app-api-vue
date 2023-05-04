import { userStore } from '@/stores'

export const useAuthStore = () => {
  const store = userStore()

  const crearUsuario = async (data) => {
    return await store.create(data).then(result =>{return result})
  }

  const borrarUsuario = async (id) => {
    return await store.delete(id).then(result => { return result })
  }

  const getUsuario = async (id) => {
    return await store.get(id).then(result => {return result})
  }

  const getAllUsuarios = async () => {
    return await store.getAll().then(res=>{return res})
  }

  const updateUsuario = async (data, id) => {
    return await store.update(id, data).then(res =>{
        return res
    })
  }

  const loginUsuario = async (data) => {
    return await store.login(data).then(res => {
        return res
    })
  }

  const registrarUsuario = async (data) => {
    console.log(data)
    return await store.register(data).then(res => {
        return res
    })
  }

  return {
    getAllUsuarios,
    getUsuario,
    crearUsuario,
    loginUsuario,
    registrarUsuario,
    borrarUsuario,
    updateUsuario,
  }
}

export default useAuthStore