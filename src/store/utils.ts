import { AsyncState, StatesTypes } from "./type"

const asyncUtils = {
  initial: <T = StatesTypes, E = any>(data?: T, error?: E): AsyncState<T, E> => ({
    loading: false,
    data: data ?? null,
    error: error || null
  }),

  loading: () => ({
    loading: true,
    data: null,
    error: null
  }),

  fulfilled: <T>(data: T): AsyncState<T> => ({
    loading: false,
    data, 
    error: null
  }),

  error: <E = any>(error: E) => ({
    loading: false,
    data: null,
    error
  }),
}

export default asyncUtils