import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'

const initialState = {
    navActive: ''
};

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'TOGGLE_NAV_ACTIVE': {
            return {
                ...state,
                navActive: action.payload
            };
        }
        default: return state;
    }
};

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;