import axios from 'axios'
import { KakaoFoodDetectionResponse, NaverLocationResponse } from './type';

const kakaoBaseUrl = '/api/ai/vision/c55bd2a0b70647ed97519363a94e3648';
const naverBaseUrl = '/naver/v1/search/local.json'

const { VITE_KAKAO_KEY, VITE_NAVER_CLIENT_KEY, VITE_NAVER_SECRET_KEY } = import.meta.env


const kakaoBaseHeaders = {
  'x-api-key': VITE_KAKAO_KEY,
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'multipart/form-data',
}

const naverBaseHeaders = {
  'X-Naver-Client-Id': VITE_NAVER_CLIENT_KEY,
  'X-Naver-Client-Secret': VITE_NAVER_SECRET_KEY,
  'Access-Control-Allow-Origin':'*',
  'content-type':'application/json',  
}

const kakaoFoodDetectionRequest = (formData: FormData) => {
  return axios.post<KakaoFoodDetectionResponse>(kakaoBaseUrl, formData, { headers: kakaoBaseHeaders })
}
const naverLocationSearchRequest = (query: string) => {  
  const url = `${naverBaseUrl}?query=${query}&display=10&start=3&sort=random`
  return axios.get<NaverLocationResponse>(url, { headers: naverBaseHeaders })
}

export {
  kakaoFoodDetectionRequest,
  naverLocationSearchRequest
}