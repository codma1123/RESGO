import { defineStore } from 'pinia'
import { reactive, ref } from 'vue' 
import { ImgResult, Model, StoreStates } from './type'
import { createAsyncStoreCallback, asyncUtils } from './utils'
import { load, ObjectDetection } from '@tensorflow-models/coco-ssd'
import { onMounted } from 'vue'

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

const { initial, loading, fulfilled, error } = asyncUtils

export const useStore = defineStore('store', () => {

  const states = reactive<StoreStates>({
    imgResult: initial<ImgResult>(),
    model: initial<Model>(),
  })
  
  const submitImg = createAsyncStoreCallback(states)
  const detectImg = createAsyncStoreCallback(states, (img: HTMLImageElement) => {
    (states.model.data as Model).detect(img)
  })
  
  const loadModel = async () => {
    states.model.loading = true
    try {       
      states.model.data = Object.freeze(await load())
    } catch (e) {      
      console.log(e)
    } finally {
      states.model.loading = false      
    }
  }

  const predictImg = async (img: HTMLImageElement): Promise<void> => {
    
    states.imgResult = loading()

    try {
      const predictions = await (states.model.data as Model).detect(img)
      states.imgResult = fulfilled(predictions)
      
    } catch (e: unknown) {
      states.imgResult = error(e)
      console.log(e)
    }
  }

  onMounted(() => {
    // setTimeout(() => loadModel(), 1000)
  })

  return {
    states,
    submitImg,
    predictImg
  }
})
