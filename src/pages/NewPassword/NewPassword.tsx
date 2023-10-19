import React, { FC, useState } from 'react'
import './NewPassword.css'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RESET_PASSWORD, RESET_PASSWORD_CONFIRM } from 'src/actions/actions'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'

const NewPassword = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { uid, token } = useParams();

    const clickButton = () => {
        if (uid && token && password === confirmPassword) dispatch(RESET_PASSWORD_CONFIRM(navigate, uid, token, password));
    }

    return (
        <PageFormTemplate page='New password'>
            <div className='newPassword'>
                <div className="newPassword__inputs">
                    <Input title='Password' type='password' placeholder='Your password' value={password} handleChange={setPassword} />
                    <Input title='Confirm password' type='password' placeholder='Confirm password' value={confirmPassword} handleChange={setConfirmPassword} />
                </div>
                <ButtonForm handleClick={clickButton}>Set password</ButtonForm>
            </div>
        </PageFormTemplate>
    )
}

export default NewPassword
