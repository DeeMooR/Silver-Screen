import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'
import storeMainReducer from './storeMain';
import storeUserReducer from './storeUser';
import storePagesReducer from './storePages';

const rootReducer = combineReducers({
    store: storeMainReducer,
    storeUser: storeUserReducer,
    storePages: storePagesReducer,
});

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
);
export default store;