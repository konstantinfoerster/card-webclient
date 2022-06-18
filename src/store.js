import { configureStore, createReducer } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  bookmark:{}
}

export const bookmarks = createReducer(initialState, (builder) => {
})

const reducer = {
  bookmarks
}

const store = configureStore({
  reducer,
})

export default store
