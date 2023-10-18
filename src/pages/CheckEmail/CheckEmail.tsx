import React, { FC, useState } from 'react'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'
import { useNavigate } from 'react-router-dom'
import './CheckEmail.css'

interface ICheckEmail {
    success: boolean,
    messege: 'register' | 'reset password'
}

const CheckEmail:FC<ICheckEmail> = ({success, messege}) => {
    const navigate = useNavigate();
    return (
        <PageFormTemplate page={`${success ? 'Check email' : 'Error'}`}>
            <div className='checkEmail'>
                {success ? (
                    <>
                    <p className='checkEmail__text'>A confirmation letter was sent to email.<br/>Follow the link in the email to {messege}</p>
                    <ButtonForm handleClick={() => navigate('/sign-in')}>Go to Sign In</ButtonForm>
                    </>
                ) : (
                    <>
                    <p className='checkEmail__text'>Unknown error.<br/>Please try again.</p>
                    {messege === 'register'
                    ? <ButtonForm handleClick={() => navigate('/sign-up')}>Go to Sign Up</ButtonForm>
                    : <ButtonForm handleClick={() => navigate('/sign-in')}>Go to Sign In</ButtonForm>
                    }
                    
                    </>
                )}
            </div>
        </PageFormTemplate>
    )
}

export default CheckEmail
