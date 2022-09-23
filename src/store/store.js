import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '../modules/search/slice.js'

const store = configureStore({
  reducer,
})

export default store
