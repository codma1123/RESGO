import { defineStore } from 'pinia'
import { reactive } from 'vue' 
import { ImgResult, Model, StoreStates } from './type'
import { createAsyncStoreCallback, asyncUtils } from './utils'
import { DetectedObject, load } from '@tensorflow-models/coco-ssd'

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

const { initial } = asyncUtils

export const useStore = defineStore('store', () => {

  // 비동기 상태
  const asyncStates = reactive<StoreStates>({
    imgResult: initial<ImgResult>(),
    model: initial<Model>(),
  })


  // 상태
  const states = reactive<{[state: string]: any}>({
    
  })


  // 비동기스토어 관리함수 초기화
  const asyncStateCallback = createAsyncStoreCallback(asyncStates)


  /**
   * 분석 모델을 로드하는 액션
   */
  const loadModel = () => asyncStateCallback('model', async () => Object.freeze(await load()))


  /**
   * 이미지를 분석하는 액션
   * @param img 분석할 이미지
   */
  const predictImg = (img: HTMLImageElement | HTMLCanvasElement) => asyncStateCallback('imgResult', {
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
