import React, { FC, useState } from 'react'
import './SignInUp.css'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { CREATE_USER, SIGN_IN } from 'src/actions/actions'
import PageFormTemplate from 'src/components/PageFormTemplate'
import ButtonForm from 'src/components/ButtonForm'

interface ISignInUp {
    page: 'Sign In' | 'Sign Up'
}

const SignInUp:FC<ISignInUp> = ({page}) => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const clickButton = () => {
        if (page === 'Sign In') dispatch(SIGN_IN(navigate, email, password));
        else dispatch(CREATE_USER(navigate, {username: name, email, password}));
    }

    return (
        <PageFormTemplate page={page}>
            <div className={`sign ${page === 'Sign In' ? 'signIn' : 'signUp' }`}>
                <div className="sign__inputs">
                    {page === 'Sign Up' &&
                        <Input title='Name' type='text' placeholder='Your name' value={name} handleChange={setName} />
                    }
                    <Input title='Email' type='email' placeholder='Your email' value={email} handleChange={setEmail} />
                    <Input title='Password' type='password' placeholder='Your password' value={password} handleChange={setPassword} forgot={page === 'Sign In' ? true : false} />
                    {page === 'Sign Up' &&
                        <Input title='Confirm password' type='password' placeholder='Confirm password' value={confirmPassword} handleChange={setConfirmPassword} />
                    }
                </div>
                <ButtonForm handleClick={clickButton}>{page}</ButtonForm>
                {page === 'Sign In'
                ? <p className='sign__have-account'>Don’t have an account? <Link to='/sign-up'>Sign Up</Link></p>
                : <p className='sign__have-account'>Already have an account? <Link to='/sign-in'>Sign In</Link></p>
                }
            </div>
        </PageFormTemplate>
    )
}

export default SignInUp
