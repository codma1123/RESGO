import { AsyncState, StatesTypes, StoreStates } from "./type"

export const asyncUtils = {
  initial: <T = StatesTypes, E = any>(data?: T, error?: E): AsyncState<T, E> => ({
    loading: false,
    data: data ?? null,
    error: error || null
  }),

  loading: <T, E>(): AsyncState<T, E> => ({
    loading: true,
    data: null,
    error: null
  }),

  fulfilled: <T>(data: T): AsyncState<T> => ({
    loading: false,
    data, 
    error: null
  }),

  error: <T, E = any>(error: E): AsyncState<T, E> => ({
    loading: false,
    data: null,
    error
  }),
}

export const createAsyncStoreCallback = (states: StoreStates) => {
  const { loading, fulfilled, error } = asyncUtils
  return async (state: StatesTypes): Promise<void> => {
    states[state] = loading()
    try {
      const result = await state
      states[state] = fulfilled(result)
    } catch (e) {
      states[state] = error(e)
    }
  }
}
