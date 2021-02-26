import { createStore } from 'redux'
import { reducer } from './reducer/reducer'
// import { initialState } from './reducer/initialState'

export const store = createStore(
    reducer
    // add connection to redux devtools
    )