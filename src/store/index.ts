import { defineStore } from 'pinia'
import { reactive } from 'vue' 
import { ImgResult, Model, StoreStates } from './type'
import { createAsyncStoreCallback, asyncUtils } from './utils'
import { DetectedObject, load, ObjectDetection } from '@tensorflow-models/coco-ssd'

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

const { initial} = asyncUtils

export const useStore = defineStore('store', () => {

  const asyncStates = reactive<StoreStates>({
    imgResult: initial<ImgResult>(),
    model: initial<Model>(),
  })

  const asyncStateCallback = createAsyncStoreCallback(asyncStates)

  // 모델을 로드하는 액션
  const loadModel = () => asyncStateCallback('model', async () => Object.freeze(await load()))


  // 이미지를 분석하는 액션
  const predictImg = (img: HTMLImageElement) => asyncStateCallback('imgResult', {
    callback: async () => await asyncStates.model.data?.detect(img),
    afterEffect: (result: DetectedObject[]) => {
      result.forEach(prediction => {
        console.log(`
          추청 객체: ${prediction.class}
          추정 확률: ${(prediction.score * 100).toFixed()}
        `)
      })
    }
  })
  
  return {
    asyncStates,
    loadModel,
    predictImg
  }
})
