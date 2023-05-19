
import { setActivePinia, createPinia } from "pinia"
import {userStore} from '@/stores'


describe('Test', ()=>{
    beforeEach(()=>{
        setActivePinia(createPinia())
    })
    it('teset', ()=> {
        const go = userStore()
        expect(go.id).toBe(null)
    })
})