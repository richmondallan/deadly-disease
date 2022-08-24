import { configureStore } from '@reduxjs/toolkit'
import diseaseReducer from './diseases/diseaseSlice'

export const store = configureStore({
    reducer: {
        diseases: diseaseReducer,
    }
})