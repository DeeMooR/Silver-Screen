import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'
import { ICard, IDataCardSelect, IDataSeatSelect } from 'src/interfaces';

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
    movieTypeSelect: 'already', 
    card: [],
    cardSelect: [],
    mySeatSelect: [],
    my_card: [],
    myMovie: [],
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
        case 'SET_USER':  {
            return {
                ...state,
                user: action.payload
            };
        }
        case 'SET_MOVIE_TYPE_SELECT':  {
            return {
                ...state,
                movieTypeSelect: action.payload
            };
        }
        case 'SET_GIFT_CARD':  {
            return {
                ...state,
                card: action.payload
            };
        }
        case 'INCREMENT_GIFT_CARD':  {
            const card_id = action.payload;
            const i = state.card.findIndex((card: ICard) => card.id === card_id);   // индекс в массиве card
            if (i !== -1) {
                const newGiftCards: ICard[] = [...state.card];
                newGiftCards[i] = {
                  ...newGiftCards[i],
                  amount: newGiftCards[i].amount + 1,
                };
            
                return {
                    ...state,
                    card: newGiftCards,
                };
            }
            return state;
        }
        case 'ADD_CARD_SELECT': {
            return {
                ...state,
                cardSelect: [
                    ...state.cardSelect, 
                    action.payload
                ],
            };
        }
        case 'REMOVE_CARD_SELECT': {
            const card_id_remove = action.payload;
            const i = state.cardSelect.findIndex((item: IDataCardSelect) => item.card_id === card_id_remove);
            if (i !== -1) {
                const newCardSelect = [...state.cardSelect];
                newCardSelect.splice(i, 1);
                return {
                    ...state,
                    cardSelect: newCardSelect,
                };
            }
            return state;
        }
        case 'CLEAR_CARD_SELECT': {
            return {
                ...state,
                cardSelect: [],
            };
        }


        case 'SET_MY_CARD':  {
            console.log(action.payload)
            return {
                ...state,
                my_card: action.payload
            };
        }
        case 'CLEAR_MY_CARD':  {
            return {
                ...state,
                my_card: []
            };
        }
        case 'SET_MY_MOVIE':  {
            return {
                ...state,
                myMovie: action.payload
            };
        }
        case 'CLEAR_MY_MOVIE':  {
            return {
                ...state,
                myMovie: []
            };
        }
        case 'SET_MY_SEAT_SELECT':  {
            return {
                ...state,
                mySeatSelect: action.payload
            };
        }
        case 'ADD_MY_SEAT_SELECT': {
            return {
                ...state,
                mySeatSelect: [
                    ...state.mySeatSelect, 
                    action.payload
                ],
            };
        }
        case 'CLEAR_MY_SEAT_SELECT': {
            return {
                ...state,
                mySeatSelect: [],
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

// const storeMain = createStore(
//     //@ts-expect-error
//     rootReducerMain,
//     composeWithDevTools(applyMiddleware(thunk))
// );

export default rootReducerMain;