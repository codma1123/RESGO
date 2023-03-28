import { defineStore } from 'pinia'
import { reactive } from 'vue' 
import { StoreStates } from './type'
import asyncUtils from './utils'

const { initial, fulfilled } = asyncUtils

export const useStore = defineStore('store', () => {

  const states = reactive<StoreStates>({
    imgResult: initial()
  })

  const submitImg = (imgUrl: string) => {
    states.imgResult = fulfilled(imgUrl)
  }
    
  return {
    states,
    submitImg
  }
})
