import { IDataCardSelect, IDataMyCard, IDataMyMovie, IDataSeatSelect } from 'src/interfaces';

interface IState {
    user: {
        username: string;
        email: string;
        id: number | null;
    };
    card_select: IDataCardSelect[];
    my_seat_select: IDataSeatSelect[];
    my_card: IDataMyCard[];
    my_movie: IDataMyMovie[];
}

const initialState: IState = {
    user: {
        username: '',
        email: '',
        id: null,
    },
    card_select: [],
    my_seat_select: [],
    my_card: [],
    my_movie: [],
};

const rootReducerUser = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER':  {
            return {
                ...state,
                user: action.payload
            };
        }
        case 'ADD_CARD_SELECT': {
            return {
                ...state,
                card_select: [
                    ...state.card_select, 
                    action.payload
                ],
            };
        }
        case 'REMOVE_CARD_SELECT': {
            const card_id_remove = action.payload;
            const i = state.card_select.findIndex((item: IDataCardSelect) => item.card_id === card_id_remove);
            if (i !== -1) {
                const newCardSelect = [...state.card_select];
                newCardSelect.splice(i, 1);
                return {
                    ...state,
                    card_select: newCardSelect,
                };
            }
            return state;
        }
        case 'CLEAR_CARD_SELECT': {
            return {
                ...state,
                card_select: [],
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
                my_movie: action.payload
            };
        }
        case 'ADD_MY_MOVIE': {
            return {
                ...state,
                my_movie: [
                    ...state.my_movie, 
                    action.payload
                ],
            };
        }
        case 'CLEAR_MY_MOVIE':  {
            return {
                ...state,
                my_movie: []
            };
        }
        case 'SET_MY_SEAT_SELECT':  {
            return {
                ...state,
                my_seat_select: action.payload
            };
        }
        case 'ADD_MY_SEAT_SELECT': {
            return {
                ...state,
                my_seat_select: [
                    ...state.my_seat_select, 
                    action.payload
                ],
            };
        }
        case 'DELETE_MY_SEAT_SELECT': {
            const seat_id = action.payload;
            return {
                ...state,
                my_seat_select: state.my_seat_select.filter((item: IDataSeatSelect) => item.id !== seat_id)
            };
        }
        case 'CLEAR_MY_SEAT_SELECT': {
            return {
                ...state,
                my_seat_select: [],
            };
        }
        case 'CLEAR_STORE_USER': {
            return initialState;
        }
        default: return state;
    }
};

export default rootReducerUser;