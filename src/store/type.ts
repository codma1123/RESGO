import cocoSsd from '@tensorflow-models/coco-ssd'

export type AsyncState<T, E = any> = {
  loading: boolean
  data: T | null | undefined
  error: E | null
}

export type StoreStates = {
 model: AsyncState<Model>,
 imgResult: AsyncState<ImgResult>
}

export type ImgResult = cocoSsd.DetectedObject[]
export type Model = Readonly<cocoSsd.ObjectDetection>


export type Effect = {  

  /**
   * 요청할 비동기 함수입니다.
   * @param arg 비동기 함수에 넣을 인자입니다.
   */
  callback: (arg?: any) => Promise<any>

  /**
   * 요청된 결과를 통해 행할 추가 작업입니다.
   * @param result callback 비동기함수에서 반환한 결과값입니다.
   */
  afterEffect?: (result: any) => void | null
}



