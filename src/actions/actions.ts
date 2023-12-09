import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IDataCardSelect, IDataSeatSelect, IUserTMS, IAddMyCard, IDataMyMovie, IRoom } from "src/interfaces";
import { modalShowMessege } from "src/helpersModal";
import { IDataInputAdmin } from "src/helpers";

/* ---------  ACCOUNT  --------- */

export const GET_USER = (token: string) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'https://studapi.teachmeskills.by/auth/users/me/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },  
                }
            )
            if (response.ok) {
                const userData = await response.json();
                dispatch({ type: "SET_USER", payload: userData });
            }
        } catch (err) {
          console.log(err);
        }
    };
};

export const CREATE_USER = (navigate: any, userData: IUserTMS, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });
        console.log(userData)
        try {
            let activate = await fetch(
                "https://studapi.teachmeskills.by/auth/users/",
                {
                    method: "POST",
                    body: JSON.stringify(userData),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (activate.ok) navigate("/sign-up/check-email");
            else modalShowMessege(setModal, false);
        } catch (err) {
            console.log(err);
        } finally {
            dispatch({ type: "SET_LOADING" });
        }
    };
};

export const ACTIVATE_USER = (navigate: any, uid: string, token: string) => {
    return async () => {
        try {
            let response = await fetch(
                "https://studapi.teachmeskills.by/auth/users/activation/",
                {
                    method: "POST",
                    body: JSON.stringify({ uid, token }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) navigate("/success");
            else navigate("/no-success");
        } catch (err) {
            console.log(err);
        }
    };
};

export const SIGN_IN = (navigate: any, email: string, password: string, fromPage: string, arrMovieIsFilled: boolean, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });

        try {
            let response = await fetch(
                "https://studapi.teachmeskills.by/auth/jwt/create/",
                {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => data.json())
            .then(({access, refresh}) => {
                if (access) {
                    const fetchData = async () => {
                        if (!arrMovieIsFilled) {
                            await dispatch(GET_MOVIES(setModal));
                            await dispatch(GET_SLIDER(setModal));
                        }
                        if (fromPage) await navigate(`${fromPage}`);
                        else await navigate(-1);
                        console.log({access, refresh});
                        localStorage.setItem("access", access);
                        localStorage.setItem("refresh", refresh);
                        dispatch({ type: "SET_LOADING" });
                    };
                    fetchData();
                } else {
                    modalShowMessege(setModal, false);
                    dispatch({ type: "SET_LOADING" });
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
};


/* ---------  PASSWORD  --------- */

export const RESET_PASSWORD = (navigate: any, email: string, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });
        console.log('ku')
        console.log(email)
        try {
            let response = await fetch(
                "https://studapi.teachmeskills.by/auth/users/reset_password/",
                {
                    method: "POST",
                    body: JSON.stringify({ email }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (response.ok) navigate("/reset-password/check-email");
            else modalShowMessege(setModal, false);
        } catch (err) {
            console.log(err);
        } finally {
            dispatch({ type: "SET_LOADING" });
        }
    };
};

export const RESET_PASSWORD_CONFIRM = (navigate: any, uid: string, token: string, new_password: string, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });

        try {
            let response = await fetch(
                "https://studapi.teachmeskills.by/auth/users/reset_password_confirm/",
                {
                    method: "POST",
                    body: JSON.stringify({ uid, token, new_password }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            if (response.ok) navigate("/new-password/success");
            else modalShowMessege(setModal, false);
        } catch (err) {
            console.log(err);
        } finally {
            dispatch({ type: "SET_LOADING" });
        }
    };
};

export const RESET_PASSWORD_IN_ACCOUNT = (token: string, new_password: string, current_password: string, setModal: (v: JSX.Element) => void) => {
    return async () => {
        try {
            const response = await fetch(
                "https://studapi.teachmeskills.by/auth/users/set_password/",
                {
                    method: "POST",
                    body: JSON.stringify({ new_password, current_password }),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                }
            );
            if (response.ok) modalShowMessege(setModal, true);
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};


/* ---------  USER GET DATA  --------- */

export const GET_MY_CARDS_MOVIES = (userId: number, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {

        try {
            const response = await fetch(
                `http://localhost:8080/user/${userId}`
            )
            if (response.ok) {
                const user = await response.json();
                console.log(user.my_card)
                dispatch({ type: "SET_MY_CARD", payload: user.my_card });
                dispatch({ type: "SET_MY_MOVIE", payload: user.my_movie });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_MY_SEAT_SELECT = (user_id: number, seance_id: number, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {

        try {
            const response = await fetch(
                'http://localhost:8080/my_seat_select',
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'user_id': `${user_id}`,
                        'seance_id': `${seance_id}`
                    },
                }
            )
            if (response.ok) {
                const my_seat_select: IDataSeatSelect[] = await response.json();
                dispatch({ type: "SET_MY_SEAT_SELECT", payload: my_seat_select });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};


/* ---------  CHANGE CARD  --------- */

export const ADD_CARD_SELECT = (card_id: number, newCardSelect: IDataCardSelect, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            await dispatch({ type: "INCREMENT_GIFT_CARD", payload: card_id });
            const response = await fetch(
                "http://localhost:8080/card/increment",
                {
                    method: "PUT",
                    body: JSON.stringify(card_id),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if (response.ok) dispatch({ type: "ADD_CARD_SELECT", payload: newCardSelect });
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const ADD_MY_CARD = (user_id: number, card_id: number, addMyCard: IAddMyCard, setModal: (v: JSX.Element) => void) => {
    return async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/my_card`,
                {
                    method: "POST",
                    body: JSON.stringify(addMyCard),
                    headers: {
                        'Content-Type': 'application/json',
                        'user_id': `${user_id}`,
                        'card_id': `${card_id}`
                    },
                }
            )
            if (!response.ok) modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const CHAGE_CARD_STATUS = (user_id: number, number_card: number, setMessage: (value: string) => void) => {
    return async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/my_card/status`,
                {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'user_id': `${user_id}`,
                        'number_card': `${number_card}`
                    }
                }
            )
            if (response.ok) setMessage('Успешно');
            else setMessage('Ошибка');
        } catch (err) {
          console.log(err);
        }
    };
};


/* ---------  CHANGE SEAT SELECT  --------- */

export const ADD_MY_SEAT_SELECT = (user_id: number, movie_id: number, seance_id: number, add_my_seat_select: any, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });

        try {
            let response = await fetch(
                'http://localhost:8080/my_seat_select',
                {
                    method: "POST",
                    body: JSON.stringify(add_my_seat_select),
                    headers: {
                        'Content-Type': 'application/json',
                        'seance_id': `${seance_id}`,
                        'user_id': `${user_id}`
                    },
                }
            )
            if (response.ok) {
                const add_my_seat_select: IDataSeatSelect = await response.json();
                dispatch({ type: "ADD_MY_SEAT_SELECT", payload: add_my_seat_select });
            }
            else modalShowMessege(setModal, false);

            response = await fetch(
                "http://localhost:8080/places",
                {
                    method: "PUT",
                    body: JSON.stringify(-user_id),
                    headers: {
                        'Content-Type': 'application/json',
                        'seance_id': `${seance_id}`,
                        'index_row': `${add_my_seat_select.i_row - 1}`,
                        'index_column': `${add_my_seat_select.i_column - 1}`
                    },
                }
            )
            if (!response.ok) modalShowMessege(setModal, false);

            await dispatch(GET_SEANCES_ONE_MOVIE(movie_id, setModal));
        } catch (err) {
          console.log(err);
        } finally {
            dispatch({ type: "SET_LOADING" });
        }
    };
};

export const REMOVE_MY_SEAT_SELECT = (data: any, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });

        try {
            let response = await fetch(
                `http://localhost:8080/my_seat_select/${data.seat_id}`,
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if (response.ok) {
                await dispatch({ type: "DELETE_MY_SEAT_SELECT", payload: data.seat_id });
            }
            else modalShowMessege(setModal, false);

            response = await fetch(
                "http://localhost:8080/places",
                {
                    method: "PUT",
                    body: JSON.stringify(0),
                    headers: {
                        'Content-Type': 'application/json',
                        'seance_id': `${data.seance_id}`,
                        'index_row': `${data.i_row - 1}`,
                        'index_column': `${data.i_column - 1}`
                    },
                }
            )
            if (response.ok) {
                await dispatch(GET_SEANCES_ONE_MOVIE(data.movie_id, setModal));
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        } finally {
            dispatch({ type: "SET_LOADING" });
        }
    };
};

export const BUY_MY_SEAT_SELECT = (user_id: number, movie_id: number, seance_id: number, type_id: string, seat_id: number, obj: any, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            let response = await fetch(
                "http://localhost:8080/places",
                {
                    method: "PUT",
                    body: JSON.stringify(user_id),
                    headers: {
                        'Content-Type': 'application/json',
                        'seance_id': `${seance_id}`,
                        'index_row': `${obj.i_row - 1}`,
                        'index_column': `${obj.i_column - 1}`
                    },
                }
            )
            if (!response.ok) modalShowMessege(setModal, false);
            
            response = await fetch(
                "http://localhost:8080/my_movie",
                {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json',
                        'movie_id': `${movie_id}`,
                        'type_id': `${type_id}`,
                        'seance_id': `${seance_id}`,
                        'user_id': `${user_id}`
                    },
                }
            )
            if (response.ok) {
                const add_my_movie: IDataMyMovie = await response.json();
                await dispatch({ type: "ADD_MY_MOVIE", payload: add_my_movie });
            }
            else modalShowMessege(setModal, false);

            response = await fetch(
                `http://localhost:8080/my_seat_select/${seat_id}`,
                {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if (!response.ok) modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};


/* ---------  GET DATA  --------- */

export const GET_MOVIES = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                "http://localhost:8080/movie"
            )
            if (response.ok) {
                const arrMovies = await response.json();
                dispatch({ type: "SET_MOVIES", payload: arrMovies });
            }
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_SEANCES_ONE_MOVIE = (movie_id: number, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                "http://localhost:8080/schedule",
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'movie_id': `${movie_id}`
                    },
                }
            )
            if (response.ok) {
                const arrSeances = await response.json();
                dispatch({ type: "SET_SEANCES_ONE_MOVIE", payload: {movie_id, arrSeances} });
            }
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_ROOMS = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'http://localhost:8080/room'
            )
            if (response.ok) {
                const arrRooms = await response.json();
                dispatch({ type: "SET_ROOMS", payload: arrRooms });
            }
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_GIFT_CARDS = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        
        try {
            let response = await fetch(
                "http://localhost:8080/card"
            )
            if (response.ok) {
                const arrGiftCards = await response.json();
                console.log(arrGiftCards);
                dispatch({ type: "SET_GIFT_CARD", payload: arrGiftCards });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_SEAT_TYPES = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'http://localhost:8080/seat_type'
            )
            if (response.ok) {
                const arrSeatTypes = await response.json();
                dispatch({ type: "SET_SEAT_TYPES", payload: arrSeatTypes });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_SLIDER = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                "http://localhost:8080/slider"
            )
            if (response.ok) {
                const arrSlider = await response.json();
                dispatch({ type: "SET_SLIDER", payload: arrSlider });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_PAGE_TITLES = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'http://localhost:8080/page_title'
            )
            if (response.ok) {
                const arrPageTitle = await response.json();
                dispatch({ type: "SET_PAGE_TITLES", payload: arrPageTitle });
            }
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_NEWS = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'http://localhost:8080/page_news'
            )
            if (response.ok) {
                const arrNews = await response.json();
                dispatch({ type: "SET_NEWS", payload: arrNews });
            }
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};


/* --------- ADD DATA  --------- */

export const ADD_DATA = (url: string, objBody: any, foreignKeys: any, setMessage: (value: string) => void) => {
    return async () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        Object.keys(foreignKeys).forEach(name => {
            headers.append(name, foreignKeys[name]);
        });

        try {
            const response = await fetch(
                `http://localhost:8080/${url}`,
                {
                    method: "POST",
                    body: JSON.stringify(objBody),
                    headers: headers,
                }
            )
            if (response.ok) setMessage('Успешно');
            else setMessage('Ошибка');
        } catch (err) {
          console.log(err);
        }
    };
};

export const ADD_MOVIE_AND_GENRES = (objBody: any, genres: string[], setMessage: (value: string) => void) => {
    return async () => {
        try {
            let response = await fetch(
                'http://localhost:8080/movie',
                {
                    method: "POST",
                    body: JSON.stringify(objBody),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (response.ok) {
                setMessage('Успешно');
                const objMovie = await response.json();
                const sendGenres = async () => {
                    for (const item of genres) {
                        response = await fetch(
                            'http://localhost:8080/genre',
                            {
                                method: "POST",
                                body: JSON.stringify(item),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'movie_id': `${objMovie.id}`
                                }
                            }
                        );
                        if (!response.ok) setMessage('Ошибка');
                    }
                }
                sendGenres();
            }
            else setMessage('Ошибка');
        } catch (err) {
          console.log(err);
        }
    };
};

export const ADD_SEANCE_AND_PLACES = (objBody: any, foreignKeys: any, objRoom: IRoom, setMessage: (value: string) => void) => {
    return async () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        Object.keys(foreignKeys).forEach(name => {
            headers.append(name, foreignKeys[name]);
        });

        try {
            let response = await fetch(
                'http://localhost:8080/seance',
                {
                    method: "POST",
                    body: JSON.stringify(objBody),
                    headers: headers,
                }
            )
            if (response.ok) {
                setMessage('Успешно');
                const seance_id = await response.json();
                const sendSequentially = async () => {
                    for (const item of objRoom.rows) {
                        const row = new Array(item.seats).fill(0);
                        console.log(row);
                        response = await fetch(
                            'http://localhost:8080/places',
                            {
                                method: "POST",
                                body: JSON.stringify(row),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'seance_id': `${seance_id}`
                                }
                            }
                        );
                        if (!response.ok) setMessage('Ошибка');
                    }
                }
                sendSequentially();
            }
            else setMessage('Ошибка');
        } catch (err) {
          console.log(err);
        }
    };
};