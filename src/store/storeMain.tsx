const initialState = {
    navActive: '',
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
        case 'SET_LOADING_PAGE_TRUE': {
            return {
                ...state,
                isLoadingPage: true,
            };
        }
        case 'SET_LOADING_PAGE_FALSE': {
            return {
                ...state,
                isLoadingPage: false,
            };
        }
        default: return state;
    }
};

export default rootReducerMain;