import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import TitleWithSwitch from 'src/components/TitleWithSwitch';
import PageTemplate from 'src/components/PageTemplate';
import InputNotActive from 'src/components/InputNotActive';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import AccountBuy from './AccountBuy';
import { RESET_PASSWORD_IN_ACCOUNT } from 'src/actions/actions';
import './Account.css'

const Account = () => {
    const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
    const navigate = useNavigate();
    let name = useSelector(({storeUser}) => storeUser.user.username);
    let email = useSelector(({storeUser}) => storeUser.user.email);
    let token = localStorage.getItem('access') || 'err';

    const [modal, setModal] = useState(<div/>);
    const [isMismatch, setIsMismatch] = useState(false);
    const [activePage, setActivePage] = useState(1);

    // State для изменения пароля
    const [current_password, setCurrentPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [confirm_new_password, setConfirmNewPassword] = useState('');

    // очистить данные о картах и фильмах пользователя
    useEffect(() => {
        window.scrollTo({top: 0});
        dispatch({ type: "CLEAR_MY_CARD" });
        dispatch({ type: "CLEAR_MY_MOVIE" });
    },[])

    // убрать красное выделение если начал изменять
    useEffect(() => {
        setIsMismatch(false);
    },[new_password, confirm_new_password])

    // очистить поля ввода
    const clickCancel = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    // сохранить новый пароль
    const clickSave = () => {
        if (new_password !== confirm_new_password) setIsMismatch(true);
        else dispatch(RESET_PASSWORD_IN_ACCOUNT(token, new_password, current_password, setModal));
    };

     // выход из аккаунта
    const clickExit = () => {
        dispatch({ type: "CLEAR_STORE_USER" });
        localStorage.removeItem('access');
        navigate('/sign-in', {state: {fromPage: '/'}});
    }

    return (
        <PageTemplate wrapper>
            {modal}
            <div className='account'>
                <TitleWithSwitch title='Аккаунт' switch_1='Профиль' switch_2='Мои покупки' active={activePage} setActive={setActivePage} />
                {activePage === 1 ? (
                    <div className="profile">
                        <p className='profile-section__title'>Учётная запись</p>
                        <div className="profile__name-email">
                            <InputNotActive title='Имя' value={name} />
                            <InputNotActive title='Почта' value={email} />
                        </div>
                        <p className='profile-section__title'>Пароль</p>
                        <div className='profile__password'>
                            <div className="password-profile__left">
                                <Input title='Текущий пароль' type='password' placeholder='Ваш пароль' value={current_password} handleChange={setCurrentPassword} />
                            </div>
                            <div className="password-profile__right">
                                <Input title='Новый пароль' type='password' placeholder='Новый пароль' value={new_password} handleChange={setNewPassword} defect={isMismatch} />
                                <Input title='Подтвердите пароль' type='password' placeholder='Подтвердите пароль' value={confirm_new_password} handleChange={setConfirmNewPassword} defect={isMismatch} />
                            </div>
                        </div>
                        <div className="profile__buttons">
                            <div className="profile__exit">
                                <Button color='red' handleClick={clickExit}>Выйти из аккауанта</Button>
                            </div>
                            <div className="profile__cancel-save">
                                <Button color='white' handleClick={clickCancel}>Отмена</Button>
                                <Button color='red' handleClick={clickSave}>Сохранить</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <AccountBuy />
                )}
            </div>
        </PageTemplate>
    )
}

export default Account
