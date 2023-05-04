import { defineStore } from 'pinia'
import { reactive } from 'vue' 
import { AsyncStore, ImgResult, Model, StoreStates } from './type'
import { createAsyncStoreCallback, asyncUtils } from './utils'

import  { kakaoFoodDetectionRequest } from '../api'
import { KakaoFoodDetectionResult } from '../api/type'

const { initial } = asyncUtils

export const useStore = defineStore('store', () => {

  // 비동기 상태
  const asyncStates = reactive<AsyncStore>({
    imgResult: initial<ImgResult>(),
    model: initial<Model>(),
    result: initial<any>()
  })
  // 상태
  const states = reactive<{[state: string]: any}>({
    imgTags: []
  })


  // 비동기스토어 관리함수 초기화
  const asyncStateCallback = createAsyncStoreCallback(asyncStates)

  const requestKakao = async (img: File) => {
    const { result } = asyncStates

    // 이미지 form 생성
    const imgBinary = new FormData()
    imgBinary.append('image', img)
    
    result.loading = true    
    try {
      const res = await kakaoFoodDetectionRequest(imgBinary)
      result.data = res.data.result
                      .map((value: KakaoFoodDetectionResult) => value.class_info[0].food_name)
                      .join(' ')

      console.log(result.data)
            
    } catch (e) {
      console.log(e)
    }

    result.loading = false
    
  }


  
  return {
    asyncStates,
    requestKakao,
    states
  }
})
