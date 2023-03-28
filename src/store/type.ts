export type AsyncState<T, E = any> = {
  loading: boolean
  data: T | null
  error: E | null
}

export type ImgResult = string

export type StoreStates = {
  imgResult: AsyncState<ImgResult>
}

export type StatesTypes = ImgResult 

