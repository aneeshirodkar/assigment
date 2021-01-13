import {applyMiddleware,createStore} from 'redux'
import rootReducer from '../src/Store/Reducer/todoList'
import ReduxThunk from 'redux-thunk';

const middlewares = [ReduxThunk];

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
    return createStoreWithMiddleware(rootReducer,initialState)
}
