import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'

const initialState = {
    slider: [],
    seatTypes: [],
    arrRooms: [],
    arrMovies: [],
    arrSeances: []
};

const rootReducerPages = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_SLIDER': {
            return {
                ...state,
                slider: action.payload,
            };
        }
        case 'SET_SEAT_TYPES': {
            return {
                ...state,
                seatTypes: action.payload,
            };
        }
        case 'SET_ROOMS': {
            return {
                ...state,
                arrRooms: action.payload,
            };
        }
        case 'SET_MOVIES': {
            return {
                ...state,
                arrMovies: action.payload,
            };
        }
        case 'SET_SEANCES': {
            return {
                ...state,
                arrSeances: action.payload,
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