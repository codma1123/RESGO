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

export type {
  KakaoFoodDetectionResponse,
  KakaoFoodDetectionResult,
  Class_Info
}
