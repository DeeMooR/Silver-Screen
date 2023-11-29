import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'
import { ICard, IDataGiftSelect, IDataSeatSelect } from 'src/interfaces';

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
    giftCard: [],
    giftSelect: [],
    mySeatSelect: [],
    myCard: [],
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
                giftCard: action.payload
            };
        }
        case 'CHANGE_AMOUNT_GIFT_CARD': {
            const id = action.payload;
            const i = state.giftCard.findIndex((card: ICard) => card.id === id);   // индекс в массиве giftCard
            if (i !== -1) {
                const newGiftCards: ICard[] = [...state.giftCard];
                newGiftCards[i] = {
                  ...newGiftCards[i],
                  amount: newGiftCards[i].amount + 1,
                };
            
                return {
                    ...state,
                    giftCard: newGiftCards,
                };
            }
            return state;
        }
        case 'ADD_GIFT_SELECT': {
            return {
                ...state,
                giftSelect: [
                    ...state.giftSelect, 
                    action.payload
                ],
            };
        }
        case 'REMOVE_GIFT_SELECT': {
            const idCardRemove = action.payload;
            const i = state.giftSelect.findIndex((item: IDataGiftSelect) => item.idCard === idCardRemove);
            if (i !== -1) {
                const newGiftSelect = [...state.giftSelect];
                newGiftSelect.splice(i, 1);

                return {
                    ...state,
                    giftSelect: newGiftSelect,
                };
            }
            return state;
        }
        case 'CLEAR_GIFT_SELECT': {
            return {
                ...state,
                giftSelect: [],
            };
        }
        case 'SET_MY_CARD':  {
            return {
                ...state,
                myCard: action.payload
            };
        }
        case 'CLEAR_MY_CARD':  {
            return {
                ...state,
                myCard: []
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