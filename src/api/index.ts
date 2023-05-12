import axios from 'axios'
import { KakaoFoodDetectionResponse, LatLng, NaverGeocodingResponse, NaverLocationResponse } from './type';

const kakaoBaseUrl = '/api/ai/vision/c55bd2a0b70647ed97519363a94e3648';
const naverBaseUrl = '/naver/v1/search/local.json'
const geocodingReverseBaseUrl = '/geocoding/map-reversegeocode/v2/gc'
const geocodingBaseUrl = '/geocoding/map-geocode/v2/geocode'

const { 
  VITE_KAKAO_KEY, 
  VITE_NAVER_CLIENT_KEY, 
  VITE_NAVER_SECRET_KEY,
  VITE_GEOCODING_CLIENT_KEY,
  VITE_GEOCODING_SECRET
} = import.meta.env


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

const geocodingBaseHeaders = {
  "X-NCP-APIGW-API-KEY-ID": VITE_GEOCODING_CLIENT_KEY,
  "X-NCP-APIGW-API-KEY": VITE_GEOCODING_SECRET,
}



// 카카오 음식 인식 요청
const kakaoFoodDetectionRequest = (formData: FormData) => {
  return axios.post<KakaoFoodDetectionResponse>(kakaoBaseUrl, formData, { headers: kakaoBaseHeaders })
}

// 네이버 장소 검색 요청
const naverLocationSearchRequest = (query: string) => {  
  const url = `${naverBaseUrl}?query=${query}&display=10&start=3&sort=random`
  return axios.get<NaverLocationResponse>(url, { headers: naverBaseHeaders })
}

// 네이버 위도 경도 변환 요청
const geocodingReverseRequest = (latlng: LatLng) => {
  const url = `${geocodingReverseBaseUrl}?coords=${latlng.longitude},${latlng.latitude}&output=json&orders=addr`
  console.log(url)
  return axios.get<NaverGeocodingResponse>(url, { headers: geocodingBaseHeaders })
}

const geocodingRequest = (address: string) => {
  const url = `${geocodingBaseUrl}?query=${address}`
  console.log(url)
  return axios.get<any>(url, { headers: geocodingBaseHeaders })
}

export {
  kakaoFoodDetectionRequest,
  naverLocationSearchRequest,
  geocodingReverseRequest,
  geocodingRequest
}