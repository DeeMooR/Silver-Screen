import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IDataGiftCard, IDataGiftSelect, IDataMyCard, IUser, IUserBuy } from "src/interfaces";
import instance from "src/axiosConfig";
import ModalSuccess from "src/components/ModalSuccess";
import { modalShowMessege } from "src/helpersModal";

export const CREATE_USER = (navigate: any, userData: IUser, setModal: (v: JSX.Element) => void) => {
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


export const GET_GIFT_CARDS = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        
        try {
            const response = await fetch(
                "https://jsonblob.com/api/jsonBlob/1165575060923998208"     // gift_cards
            )
            if (response.ok) {
                const arrGiftCards = await response.json();
                await dispatch({ type: "SET_MAIN_PRESENT_CARD", payload: arrGiftCards.shift() });
                dispatch({ type: "SET_GIFT_CARDS", payload: arrGiftCards });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const ADD_GIFT_SELECT = (arrWithNewAmount: IDataGiftCard[], objForGiftSelect: IDataGiftSelect, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });

        try {
            await dispatch({ type: "SET_GIFT_CARDS", payload: arrWithNewAmount });
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165575060923998208',        // gift_cards
                {
                    method: "PUT",
                    body: JSON.stringify(arrWithNewAmount),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if (response.ok) dispatch({ type: "ADD_GIFT_SELECT", payload: objForGiftSelect });
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        } finally {
            dispatch({ type: "SET_LOADING" });
        }
    };
};

export const SEND_MY_CARDS = (userId: number, addArrMyCards: IDataMyCard[], setModal: (v: JSX.Element) => void) => {
    return async () => {
        let newArrUsers, userIsExist = false;
        try {
            let response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165611207637196800'        // users
            )
            if (response.ok) {
                const arrUsers = await response.json();
                newArrUsers = arrUsers.map((objUser: IUserBuy) => {
                    if (objUser.id === userId) {
                        userIsExist = true;
                        return {
                            ...objUser,
                            cards: [...objUser.cards, ...addArrMyCards],
                        };
                    }
                    return objUser;
                });
                if (!userIsExist) newArrUsers = [...arrUsers, { id: userId, cards: addArrMyCards, movies: [] }];
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

export const GET_MY_CARDS = (userId: number, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {

        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165611207637196800'        // users
            )
            if (response.ok) {
                const arrUsers = await response.json();
                const objUser = arrUsers.find((item: IUserBuy) => item.id === userId)
                if (objUser) dispatch({ type: "SET_MY_CARDS", payload: objUser.cards });
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
                await dispatch({ type: "SET_MAIN_ENTERTAINMENT", payload: arrEntertainmentNews.shift() });
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
                'https://jsonblob.com/api/jsonBlob/1165670168029683712'        // slider_swiper
            )
            if (response.ok) {
                const arrSliderSwiper = await response.json();
                dispatch({ type: "SET_SLIDER_SWIPER", payload: arrSliderSwiper });
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

export const GET_MAIN_VISA = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        try {
            const response = await fetch(
                'https://jsonblob.com/api/jsonBlob/1165726551970275328'        // main_visa
            )
            if (response.ok) {
                const objMainVisa = await response.json();
                dispatch({ type: "SET_MAIN_VISA", payload: objMainVisa });
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
                'https://jsonblob.com/api/jsonBlob/1165743472891518976'        // main_movies
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