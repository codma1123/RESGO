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
    result: initial<string[]>()
  })
  
  // 상태
  const states = reactive({
    imgTags: [],
    imgUrl: ''
  })


  // 비동기스토어 관리함수 초기화
  const asyncStateCallback = createAsyncStoreCallback(asyncStates)

  const requestKakao = async (img: File) => {
    const { result } = asyncStates
    result.loading = true    

    // 이미지 form 생성
    const imgBinary = new FormData()
    imgBinary.append('image', img)
    
    try {
      const res = await kakaoFoodDetectionRequest(imgBinary)

      result.data = [...new Set(res.data.result
        .sort((value, target) => value.h * value.w > target.h * target.h ? -1 : 1)
        .map(value => value.class_info[0].food_name)
      )]
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
