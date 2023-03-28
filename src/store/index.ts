import { defineStore } from 'pinia'
import { reactive } from 'vue' 
import { AsyncState, StatesTypes, StoreStates } from './type'
import asyncUtils from './utils'

const { initial, fulfilled, loading, error } = asyncUtils

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

const createAsyncStoreCallback = (states: StoreStates) => {
  return async (state: StatesTypes): Promise<void> => {
    states[state] = loading()
    try {
      const result = await state
      states[state] = fulfilled(result)
    } catch (e) {
      states[state] = error(e)
    }
  }
}