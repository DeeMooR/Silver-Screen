import React, { FC, useState } from 'react'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'
import { useNavigate } from 'react-router-dom'
import './NewPasswordSuccess.css'

interface INewPasswordSuccess {
    success: boolean,
}

const NewPasswordSuccess:FC<INewPasswordSuccess> = ({success}) => {
    const navigate = useNavigate();
    return (
        <PageFormTemplate page={`${success ? 'Success' : 'Error'}`}>
            <div className='newPasswordSuccess'>
                <p className='newPasswordSuccess__text'>
                    {success ? 'The password was successfully changed' : 'The password has not been changed'}
                </p>
                <ButtonForm handleClick={() => navigate('/sign-in')}>Go to Sign In</ButtonForm>
            </div>
        </PageFormTemplate>
    )
}

export default NewPasswordSuccess
