import { defineStore } from 'pinia'
import { reactive } from 'vue' 
import { ImgResult, Model } from './type'
import { asyncUtils } from './utils'

import  { kakaoFoodDetectionRequest, naverLocationSearchRequest } from '../api'
import { ResultItem } from '../api/type'

const { initial } = asyncUtils

export const useStore = defineStore('store', () => {

  // 비동기 상태
  const asyncStates = reactive({
    imgResult: initial<ImgResult>(),
    model: initial<Model>(),
    result: initial<string[]>(),
    naverLocationSearchResult: initial<ResultItem[]>()
  })

  
  // 상태
  const states = reactive({
    imgTags: [],
    imgUrl: ''
  })


  // 비동기스토어 관리함수 초기화
  // const asyncStateCallback = createAsyncStoreCallback(asyncStates)

  const requestKakao = async (img: File): Promise<string> => {
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

      // 네이버 검색 쿼리 전송을 위한 promise return 
      return result.data.slice(0, 1).join(' ')

    } catch (e: unknown) {
      throw e
    } finally {
      result.loading = false    
    }
  }

  const resquestNaver = async (query: string): Promise<void> => {
    const { naverLocationSearchResult } = asyncStates
    naverLocationSearchResult.loading = true

    try {
      const res = await naverLocationSearchRequest(query)
      naverLocationSearchResult.data = res.data.items.map(item => ({
        ...item,
        title: item.title.replace(/<\/?b>/gi, '')
      }))

    } catch (e: unknown) {
      throw e
    } finally {
      naverLocationSearchResult.loading = false    
    }
  }

  return {
    asyncStates,
    requestKakao,
    resquestNaver,
    states
  }
})
