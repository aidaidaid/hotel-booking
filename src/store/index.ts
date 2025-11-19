import { combineReducers, createStore } from 'redux'
import { formReducer } from './formReducer'
import { selectionsReducer } from './selectionsReducer'

const rootReducer = combineReducers({
  form: formReducer,
  selections: selectionsReducer,
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch