import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'

const initialState = {
    navActive: '',
    idActiveMoviePage: '',
    search: {
        date: '',
        video: [],
        audio: [],
        language: [],
    },
    user: {
        username: '',
        email: '',
        id: null,
    },
    isLoading: false,
};

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'TOGGLE_NAV_ACTIVE': {
            return {
                ...state,
                navActive: action.payload
            };
        }
        case 'SET_ID_ACTIVE_MOVIE_PAGE': {
            return {
                ...state,
                idActiveMoviePage: action.payload
            };
        }
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
        case 'CLEAR_SEARCH': {
            return {
                ...state,
                search: {
                    date: action.payload,
                    video: [],
                    audio: [],
                    language: [],
                }
            };
        }
        case 'SET_USER':  {
            return {
                ...state,
                user: action.payload
            };
        }
        case 'SET_LOADING':  {
            return {
                ...state,
                isLoading: !state.isLoading,
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