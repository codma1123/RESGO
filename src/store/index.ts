import { defineStore } from 'pinia'
import { reactive } from 'vue' 
import { StoreStates } from './type'
import { createAsyncStoreCallback, asyncUtils } from './utils'

const { initial } = asyncUtils

export const useStore = defineStore('store', () => {

  const states = reactive<StoreStates>({
    imgResult: initial()
  })

  const submitImg = createAsyncStoreCallback(states)
        
  return {
    states,
    submitImg
  }
})
