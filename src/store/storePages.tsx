import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools} from 'redux-devtools-extension'
import { IMovie } from 'src/interfaces';

interface IState {
    slider: any[];
    seatTypes: any[];
    arrRooms: any[];
    arrMovies: IMovie[];
    arrSeances: any[];
  }
  
  const initialState: IState = {
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
        case 'SET_SEANCES_ONE_MOVIE': {
            const movie_id = action.payload.movie_id;
            const arrSeances = action.payload.arrSeances;
            return {
                ...state,
                arrMovies: state.arrMovies.map(movie => {
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

        // case 'CHANGE_PLACES': {
        //     const obj = action.payload;
        //     return {
        //     ...state,
        //     arrMovies: state.arrMovies.map(movie => {
        //         if (movie.id === obj.movie_id) {
        //             return {
        //             ...movie,
        //             schedule: movie.schedule.map(item => {
        //                 if (item.date === obj.date) {
        //                     return {
        //                     ...item,
        //                     seances: item.seances.map(sceance => {
        //                         if (sceance.id === obj.sceance_id) {
        //                             return {
        //                             ...sceance,
        //                             places: sceance.places.map(place => {})
        //                             };
        //                         }
        //                         return item;
        //                     })
        //                     };
        //                 }
        //                 return item;
        //             })
        //             };
        //         }
        //         return movie;
        //     })
        //     };
        // }

        default: return state;
    }
};

// const storePage = createStore(
//     rootReducerPages, 
//     composeWithDevTools(applyMiddleware(thunk))
// );

export default rootReducerPages;