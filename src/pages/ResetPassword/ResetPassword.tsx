import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import ButtonForm from 'src/components/ButtonForm'
import Input from 'src/components/Input'
import PageFormTemplate from 'src/components/PageFormTemplate'
import { RESET_PASSWORD } from 'src/actions/actions'
import './ResetPassword.css'

const ResetPassword = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isEmptyEmail, setIsEmptyEmail] = useState(false);
    
    const [modal, setModal] = useState(<div/>);
    const isLoading = useSelector(({store}) => store.isLoading);

    const clickButton = () => {
        if (email === '') {
            setIsEmptyEmail(true);
            return;
        }
        dispatch(RESET_PASSWORD(navigate, email, setModal));
    }
    useEffect(() => {
        setIsEmptyEmail(false);
    },[email])

    return (
        <PageFormTemplate page='Reset password'>
            {modal}
            {isLoading ? (
                <div className="loader">
                    <div className="loader__element"></div>
                </div>
            ) : (
                <div className='resetPassword'>
                    <p className='resetPassword__text'>You will receive an email with a link to reset your password!</p>
                    <div className="resetPassword__input">
                        <Input title='Email' type='email' placeholder='Your email' value={email} handleChange={setEmail} defect={isEmptyEmail} />
                    </div>
                    <ButtonForm handleClick={clickButton}>Reset</ButtonForm>
                </div>
            )}
        </PageFormTemplate>
    )
}

export default ResetPassword
