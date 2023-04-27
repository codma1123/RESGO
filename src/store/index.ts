import { defineStore } from 'pinia'
import { reactive, ref, toRefs } from 'vue' 
import { AsyncStore, ImgResult, Model, StoreStates } from './type'
import { createAsyncStoreCallback, asyncUtils } from './utils'
import { DetectedObject, load } from '@tensorflow-models/coco-ssd'

import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import createKakaoRequest from '../api'

const { initial } = asyncUtils

export const useStore = defineStore('store', () => {

  // 비동기 상태
  const asyncStates = reactive<AsyncStore>({
    imgResult: initial<ImgResult>(),
    model: initial<Model>(),
  })

  const imgRef = ref<HTMLImageElement | HTMLCanvasElement>()

  const imgUrl = ref<string>('')

  const searchTags = ref<string[]>([])

  const imgTags = ref<any>()


  // 상태
  const states = reactive<{[state: string]: any}>({
    imgTags: []
  })


  // 비동기스토어 관리함수 초기화
  const asyncStateCallback = createAsyncStoreCallback(asyncStates)


  /**
   * 분석 모델을 로드하는 액션
   */
  const loadModel = () => asyncStateCallback('model', async () => Object.freeze(await load()))

  const requestKakao = (img: BinaryData) => {
    createKakaoRequest(img)
  }


  /**
   * 이미지를 분석하는 액션
   * @param img 분석할 이미지
   */
  const predictImg = (img: HTMLImageElement | HTMLCanvasElement) => asyncStateCallback('imgResult', {
    callback: async () => await asyncStates.model.data?.detect(img),
    onLoaded: (result: DetectedObject[]) => {
      imgRef.value = img
      states.imgTags.push(result.map(prediction => prediction.class))
      console.log(states.imgTags, 'states')
    },
  })
  
  return {
    asyncStates,
    loadModel,
    predictImg,
    requestKakao,
    imgRef,
    imgUrl,
    searchTags,
    ...toRefs({
      imgTags
    }),

    states
  }
})
