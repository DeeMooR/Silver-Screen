import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'

const initialState = {
    // dispatch НЕ активны в NavigationItem и SeleptOption
    // Возможно понадобится при запросах на сервер
    search: {
        date: '',
        video: [],
        audio: [],
        language: []
    }
};

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_SEARCH': {
            const {type, data} = action.payload;
            return {
                ...state,
                search: {
                    ...state.search,
                    [type]: data
                }
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