import cocoSsd from '@tensorflow-models/coco-ssd'

export type AsyncState<T, E = any> = {
  loading: boolean
  data: T | null
  error: E | null
}

export type ImgResult = cocoSsd.DetectedObject[]
export type Model = Readonly<cocoSsd.ObjectDetection>

export type StoreStates = {
  [k in StatesTypes as string]: AsyncState<StatesTypes>
}

export type StatesTypes = 
  Model |
  ImgResult

