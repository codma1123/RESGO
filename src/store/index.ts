import { defineStore } from 'pinia'
import { reactive, ref } from 'vue' 
import { StoreStates } from './type'
import { createAsyncStoreCallback, asyncUtils } from './utils'
import { load, ObjectDetection } from '@tensorflow-models/coco-ssd'
import { onMounted } from 'vue'

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

const { initial } = asyncUtils

export const useStore = defineStore('store', () => {

  const model = ref<Readonly<ObjectDetection>>()

  const states = reactive<StoreStates>({
    imgResult: initial()
  })

  
  const submitImg = createAsyncStoreCallback(states)

  const predictImg = async (img: HTMLImageElement): Promise<void> => {
    states.imgResult.loading = true

    try {
      const predictions = await model.value?.detect(img)
      if (!predictions) throw Error('Fail Prediction')
      states.imgResult.loading = false
      states.imgResult.data = predictions
    } catch (e: unknown) {
      states.imgResult.loading = true
      console.log(e)
    }
  }

  const loadModel = async () => {
    model.value = Object.freeze(await load())
  }

  onMounted(() => {
    // loadModel()
  })

  return {
    states,
    submitImg,
    predictImg
  }
})
