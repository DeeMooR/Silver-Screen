import React, { FC, useState } from 'react'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'
import { useNavigate } from 'react-router-dom'
import './Success.css'


const Success = () => {
    const navigate = useNavigate();
    return (
        <PageFormTemplate page='Success'>
            <div className='success'>
                <p className='success__text'>Email confirmes.<br/>Your registration is now completed</p>
                <ButtonForm handleClick={() => navigate('/sign-in')}>Go to Sign In</ButtonForm>
            </div>
        </PageFormTemplate>
    )
}

export default Success
