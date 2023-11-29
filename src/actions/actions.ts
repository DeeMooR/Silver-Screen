import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ICard, IDataCardSelect, IDataMyCard, IDataSeatSelect, ISeance, IUserTMS, IUser, IAddMyCard } from "src/interfaces";
import instance from "src/axiosConfig";
import ModalSuccess from "src/components/ModalSuccess";
import { modalShowMessege } from "src/helpersModal";

// --------------------
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

// --------------------
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

// --------------------
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
                            await dispatch(GET_SLIDER_SWIPER(setModal));
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

// --------------------
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

// --------------------
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

// --------------------
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

// --------------------
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


export const GET_ENTERTAINMENT_NEWS = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165629616420675584'        // entertainment_news
            )
            if (response.ok) {
                const arrEntertainmentNews = await response.json();
                dispatch({ type: "SET_ENTERTAINMENT_NEWS", payload: arrEntertainmentNews });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_NEWSPAGE_NEWS = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165630283029798912'        // newsPage_news
            )
            if (response.ok) {
                const arrNewsPageNews = await response.json();
                dispatch({ type: "SET_NEWSPAGE_NEWS", payload: arrNewsPageNews });
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
                'https://jsonblob.com/api/jsonBlob/1165667470173659136'        // seat_types
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

export const GET_SLIDER_SWIPER = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165670168029683712'        // slider
                // "http://localhost:8080/slider"
            )
            if (response.ok) {
                const arrSliderSwiper = await response.json();
                dispatch({ type: "SET_SLIDER", payload: arrSliderSwiper });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_MAIN_NEWS = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165681210336075776'        // main_news
            )
            if (response.ok) {
                const arrMainNews = await response.json();
                dispatch({ type: "SET_MAIN_NEWS", payload: arrMainNews });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_AFISHA_NEWS = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165682261688705024'        // afisha_news
            )
            if (response.ok) {
                const arrAfishaNews = await response.json();
                dispatch({ type: "SET_AFISHA_NEWS", payload: arrAfishaNews });
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
                'https://jsonblob.com/api/jsonBlob/1165737562819387392'        // rooms
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

export const GET_MOVIES = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165743472891518976'        // movies
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

export const GET_SEANCES = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165952932608073728'        // seances
            )
            if (response.ok) {
                const arrSeances = await response.json();
                dispatch({ type: "SET_SEANCES", payload: arrSeances });
            }
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};


export const GET_SEAT_SELECT = (userId: number, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {

        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165611207637196800'        // users
            )
            if (response.ok) {
                const arrUsers: IUser[] = await response.json();
                const objUser = arrUsers.find((item: IUser) => item.id === userId)
                if (objUser) dispatch({ type: "SET_MY_SEAT_SELECT", payload: objUser.my_seat_select });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const ADD_MY_SEAT_SELECT = (userId: number, newArrSeances: ISeance[], objSeatSelect: IDataSeatSelect, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });

        try {
            await dispatch({ type: "SET_SEANCES", payload: newArrSeances });
            let response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165952932608073728',        // seances
                {
                    method: "PUT",
                    body: JSON.stringify(newArrSeances),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            console.log(objSeatSelect)
            if (response.ok) await dispatch({ type: "ADD_MY_SEAT_SELECT", payload: objSeatSelect });
            else modalShowMessege(setModal, false);
                

            // Добавление в user
            let newArrUsers, userIsExist = false;
            response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165611207637196800'        // users
            )
            if (response.ok) {
                const arrUsers = await response.json();
                newArrUsers = arrUsers.map((objUser: IUser) => {
                    if (objUser.id === userId) {
                        userIsExist = true;
                        return {
                            ...objUser,
                            my_seat_select: [...objUser.my_seat_select, objSeatSelect],
                        };
                    }
                    return objUser;
                });
                if (!userIsExist) newArrUsers = [...arrUsers, { id: userId, my_card: [], my_seat_select: [objSeatSelect], my_movie: [] }];
            } 
            else modalShowMessege(setModal, false);

            response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165611207637196800',        // users
                {
                    method: "PUT",
                    body: JSON.stringify(newArrUsers),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
        } catch (err) {
          console.log(err);
        } finally {
            dispatch({ type: "SET_LOADING" });
        }
    };
};

export const REMOVE_SEAT_SELECT = (userId: number, newArrSeances: ISeance[], newSeatSelect: IDataSeatSelect[], setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });
        
        try {
            let response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165952932608073728',        // seances
                {
                    method: "PUT",
                    body: JSON.stringify(newArrSeances),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if (response.ok) {
                await dispatch({ type: "SET_SEANCES", payload: newArrSeances });
                await dispatch({ type: "SET_MY_SEAT_SELECT", payload: newSeatSelect });
            }
            else modalShowMessege(setModal, false);


            // Добавление в user

            let newArrUsers;
            response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165611207637196800'        // users
            )
            if (response.ok) {
                const arrUsers = await response.json();
                newArrUsers = arrUsers.map((objUser: IUser) => {
                    if (objUser.id === userId) {
                        return {
                            ...objUser,
                            my_seat_select: newSeatSelect,
                        };
                    }
                    return objUser;
                });
            } 
            else modalShowMessege(setModal, false);

            response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165611207637196800',        // users
                {
                    method: "PUT",
                    body: JSON.stringify(newArrUsers),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
        } catch (err) {
          console.log(err);
        } finally {
            dispatch({ type: "SET_LOADING" });
        }
    };
};

export const SEND_MY_SEATS = (userId: number, arrSeatSelect: IDataSeatSelect[], arrSeances: ISeance[], setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        let newArrUsers, userIsExist = false;
        try {
            arrSeatSelect.forEach((seat) => {
                const { idSeance, row, column } = seat;
                const seance = arrSeances.find((seance) => seance.id === idSeance);

                if (seance) seance.places[row - 1][column - 1] = userId;
            });
            // массив arrSeances изменён
            
            await dispatch({ type: "CLEAR_MY_SEAT_SELECT" });
            await dispatch({ type: "SET_MY_MOVIE", payload: arrSeatSelect });
            await dispatch({ type: "SET_SEANCES", payload: arrSeances });

            let response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165952932608073728',        // seances
                {
                    method: "PUT",
                    body: JSON.stringify(arrSeances),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if (!response.ok) modalShowMessege(setModal, false);
            
            response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165611207637196800'        // users
            )
            if (response.ok) {
                const arrUsers = await response.json();
                newArrUsers = arrUsers.map((objUser: IUser) => {
                    if (objUser.id === userId) {
                        userIsExist = true;
                        return {
                            ...objUser,
                            my_seat_select: [],
                            my_movie: [...objUser.my_movie, ...arrSeatSelect],
                        };
                    }
                    return objUser;
                });
                if (!userIsExist) newArrUsers = [...arrUsers, { id: userId, my_card: [], my_seat_select:[], my_movie: arrSeatSelect }];
            } 
            else modalShowMessege(setModal, false);

            response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165611207637196800',        // users
                {
                    method: "PUT",
                    body: JSON.stringify(newArrUsers),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
        } catch (err) {
          console.log(err);
        }
    };
};


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

export const GET_PAGE_TITLES = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'http://localhost:8080/page_title'        // rooms
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