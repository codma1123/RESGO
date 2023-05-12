// 기본 타입
type LatLng = {
  latitude: number, 
  longitude: number
}


// 카카오 음식 분석
interface KakaoFoodDetectionResponse {
  created: string
  proc_secs: number
  request_id: string
  version: string
  result: KakaoFoodDetectionResult[]
}

interface KakaoFoodDetectionResult {
  x: number
  y: number
  w: number
  h: number
  class_info: Class_Info[]
}

interface Class_Info {
  rank: number
  food_name: string
  prob: number
  food_nutrients: any
}



// 네이버 장소 검색
interface NaverLocationResponse {
  display: number 
  items: ResultItem[]
  lastBuildDate: string
  start: number
  total: number  
}

interface ResultItem {
  title: string
  link: string
  category: string
  description: string
  telephone: string
  address: string
}

// 네이버 geocoding
interface NaverGeocodingResponse {

}

export type {
  KakaoFoodDetectionResponse,
  KakaoFoodDetectionResult,
  Class_Info,

  NaverLocationResponse,
  ResultItem,

  NaverGeocodingResponse,

  LatLng
}
