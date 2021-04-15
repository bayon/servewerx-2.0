import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';
import statusReducer from './reducers/statusReducer';

const rootReducer = combineReducers({
    auth: authReducer,   status: statusReducer, post: postReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunk))

export default createStore(rootReducer,middleware) 