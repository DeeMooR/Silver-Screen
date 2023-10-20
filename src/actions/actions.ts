import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IDataGiftCard, IDataGiftSelect, IDataMyCard, IUser } from "src/interfaces";
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

export const SIGN_IN = (navigate: any, email: string, password: string, fromPage: string, setModal: (v: JSX.Element) => void) => {
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
                    if (fromPage === 'presentcard') navigate('/presentcard');
                    else navigate("/");
                    console.log({access, refresh});
                    localStorage.setItem("access", access);
                    localStorage.setItem("refresh", refresh);
                } else {
                    modalShowMessege(setModal, false);
                }
            });
        } catch (err) {
            console.log(err);
        } finally {
            dispatch({ type: "SET_LOADING" });
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
                "https://65158a65dc3282a6a3ce950f.mockapi.io/gift_cards"
            )
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: "SET_GIFT_CARDS", payload: data });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};

export const ADD_GIFT_SELECT = (idCard: number, objForAPI: IDataGiftCard, objForGiftSelect: IDataGiftSelect, setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
        dispatch({ type: "SET_LOADING" });

        try {
            console.log(idCard)
            await dispatch({ type: "CHANGE_AMOUNT_GIFT_CARDS", payload: idCard });
            const response = await fetch(
                `https://65158a65dc3282a6a3ce950f.mockapi.io/gift_cards/${idCard}`,
                {
                    method: "PUT",
                    body: JSON.stringify(objForAPI),
                    headers: {
                        'Content-Type': 'application/json',
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

export const SEND_MY_CARDS = (arrMyCards: IDataMyCard[], setModal: (v: JSX.Element) => void) => {
    return async () => {
        try {
            arrMyCards.forEach(async (item) => {
                const response = await fetch(
                    'https://65158a65dc3282a6a3ce950f.mockapi.io/my_cards',
                    {
                        method: "POST",
                        body: JSON.stringify(item),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                if (!response.ok) modalShowMessege(setModal, false);
            })
        } catch (err) {
          console.log(err);
        }
    };
};

export const GET_MY_CARDS = (setModal: (v: JSX.Element) => void) => {
    return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {

        try {
            const response = await fetch(
                'https://65158a65dc3282a6a3ce950f.mockapi.io/my_cards',
            )
            if (response.ok) {
                const data = await response.json();
                dispatch({ type: "SET_MY_CARDS", payload: data });
            } 
            else modalShowMessege(setModal, false);
        } catch (err) {
          console.log(err);
        }
    };
};