import axios from 'axios'
import { KakaoFoodDetectionResponse } from './type';

const KEY = 'ab1c177c7689813c2e21482f6bd02ef6'
const kakaoBaseUrl = '/api/ai/vision/c55bd2a0b70647ed97519363a94e3648';

const kakaoBaseHeaders = {
  'x-api-key': KEY,
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'multipart/form-data',
}

const kakaoFoodDetectionRequest = (formData: FormData) => {
  return axios.post<KakaoFoodDetectionResponse>(kakaoBaseUrl, formData, { headers: kakaoBaseHeaders })
}

export {
  kakaoFoodDetectionRequest
}