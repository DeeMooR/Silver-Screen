import { ICard } from 'src/interfaces';

const initialState = {
    navActive: '',
    idActiveMoviePage: '',
    search: {
        date: '',
        video: [],
        audio: [],
        language: [],
    },
    movieTypeSelect: 'already',
    isLoading: false,
    isLoadingPage: false,
};

const rootReducerMain = (state = initialState, action: any) => {
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
        case 'SET_MOVIE_TYPE_SELECT':  {
            return {
                ...state,
                movieTypeSelect: action.payload
            };
        }
        case 'SET_LOADING': {
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        }
        case 'SET_LOADING_PAGE': {
            return {
                ...state,
                isLoadingPage: !state.isLoadingPage,
            };
        }
        default: return state;
    }
};

export default rootReducerMain;