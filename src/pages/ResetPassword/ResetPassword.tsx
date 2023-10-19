import React, { FC, useState } from 'react'
import './ResetPassword.css'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RESET_PASSWORD } from 'src/actions/actions'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'

const ResetPassword = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [modal, setModal] = useState(<div/>);

    const clickButtonBack = () => {
        navigate(-1);
    }
    const clickButtonReset = () => {
        dispatch(RESET_PASSWORD(navigate, email, setModal));
    }

    return (
        <PageFormTemplate page='Reset password'>
            {modal}
            <div className='resetPassword'>
                <p className='resetPassword__text'>You will receive an email with a link to reset your password!</p>
                <div className="resetPassword__input">
                    <Input title='Email' type='email' placeholder='Your email' value={email} handleChange={setEmail} />
                </div>
                <div className="resetPassword__buttons">
                    <ButtonForm handleClick={clickButtonBack} size='back'>Back</ButtonForm>
                    <ButtonForm handleClick={clickButtonReset} size='withBack'>Reset</ButtonForm>
                </div>
            </div>
        </PageFormTemplate>
    )
}

export default ResetPassword
