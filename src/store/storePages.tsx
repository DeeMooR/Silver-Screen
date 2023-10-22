import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'

const initialState = {
    entertainmentNews: [],
    newsPageNews: []
};

const rootReducerPages = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_ENTERTAINMENT_NEWS': {
            return {
                ...state,
                entertainmentNews: action.payload,
            };
        }
        case 'SET_NEWSPAGE_NEWS': {
            return {
                ...state,
                newsPageNews: action.payload,
            };
        }
        default: return state;
    }
};

// const storePage = createStore(
//     rootReducerPages, 
//     composeWithDevTools(applyMiddleware(thunk))
// );

export default rootReducerPages;