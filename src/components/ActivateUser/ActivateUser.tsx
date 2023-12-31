import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import PageFormTemplate from "../PageFormTemplate";
import { ACTIVATE_USER } from "src/actions/actions";

const ActivateUser = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const { uid, token } = useParams();

    useEffect(() => {
        if (uid && token) dispatch(ACTIVATE_USER(navigate, uid, token));
    }, [uid, token]);

    return (
        <PageFormTemplate page='Activating'>
            <div className="loader">
                <div className="loader__element"></div>
            </div>
        </PageFormTemplate>
    )
};

export default ActivateUser;
