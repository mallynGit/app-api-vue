import { setActivePinia, createPinia } from 'pinia'
import {userStore} from '@/stores'
import {describe, beforeEach, test, expect} from 'vitest'


describe('Test', ()=>{
    beforeEach(()=>{
        setActivePinia(createPinia())
    })
    test('teset', ()=> {
        const go = userStore()
        console.log(go);
        expect(go.data.id).toBe(null)
    })
})