import { ICard, IMovie, INews, IPageTitle, IRoom, ISeatType, ISlide } from 'src/interfaces';

interface IState {
    slider: ISlide[];
    seatTypes: ISeatType[];
    rooms: IRoom[];
    movies: IMovie[];
    cards: ICard[];
    pageTitles: IPageTitle[];
    news: INews[];
}
  
const initialState: IState = {
    slider: [],
    seatTypes: [],
    rooms: [],
    movies: [],
    cards: [],
    pageTitles: [],
    news: [],
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
                rooms: action.payload,
            };
        }
        case 'SET_MOVIES': {
            return {
                ...state,
                movies: action.payload,
            };
        }
        case 'SET_SEANCES_ONE_MOVIE': {
            const movie_id = action.payload.movie_id;
            const arrSeances = action.payload.arrSeances;
            return {
                ...state,
                movies: state.movies.map(movie => {
                    if (movie.id === movie_id) {
                        return {
                        ...movie,
                        schedule: arrSeances
                        };
                    }
                    return movie;
                })
            };
        }
        case 'SET_GIFT_CARD':  {
            return {
                ...state,
                cards: action.payload
            };
        }
        case 'INCREMENT_GIFT_CARD':  {
            const card_id = action.payload;
            const i = state.cards.findIndex((card: ICard) => card.id === card_id);   // индекс в массиве cards
            if (i !== -1) {
                const newGiftCards: ICard[] = [...state.cards];
                newGiftCards[i] = {
                  ...newGiftCards[i],
                  amount: newGiftCards[i].amount + 1,
                };
            
                return {
                    ...state,
                    cards: newGiftCards,
                };
            }
            return state;
        }
        case 'SET_PAGE_TITLES':  {
            return {
                ...state,
                pageTitles: action.payload
            };
        }
        case 'SET_NEWS':  {
            return {
                ...state,
                news: action.payload
            };
        }
        default: return state;
    }
};

export default rootReducerPages;