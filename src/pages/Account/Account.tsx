import React, { useEffect, useState } from 'react'
import PageTemplate from 'src/components/PageTemplate';
import './Account.css'
import InputNotActive from 'src/components/InputNotActive';
import { useSelector } from 'react-redux';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import TitleWithSwitch from 'src/components/TitleWithSwitch';
import ModalSuccess from 'src/components/ModalSuccess';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate();
    let name = useSelector(({ user }) => user.username);
    let email = useSelector(({ user }) => user.email);
    const accessToken = localStorage.getItem('access');
    const [modal, setModal] = useState(<div/>);

    const [current_password, setCurrentPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [confirm_new_password, setConfirmNewPassword] = useState('');

    useEffect(() => {
        window.scrollTo({top: 0});
    },[])

    const clickCancel = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }
    const clickExit = () => {
        localStorage.removeItem('access');
        navigate('/sign-in', {state: {fromPage: 'account'}});
    }
    const clickSave = async () => {
        if (new_password !== confirm_new_password) {
            setModal(<ModalSuccess isSuccess={false} />);
            setTimeout(() => {
                setModal(<div/>);
            }, 3400);
            return;
        }
        try {
            const response = await fetch(
                "https://studapi.teachmeskills.by/auth/users/set_password/",
                {
                method: "POST",
                body: JSON.stringify({ new_password, current_password }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                }
            );
            if (response.ok) setModal(<ModalSuccess isSuccess />);
            else setModal(<ModalSuccess isSuccess={false} />);
            setTimeout(() => {
                setModal(<div/>);
            }, 3400);
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <PageTemplate wrapper>
            <div className='account'>
                {modal}
                <TitleWithSwitch title='Аккаунт' switch_1='Профиль' switch_2='Мои билеты' active='1' />
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
                            <Input title='Новый пароль' type='password' placeholder='Новый пароль' value={new_password} handleChange={setNewPassword} />
                            <Input title='Подтвердите пароль' type='password' placeholder='Подтвердите пароль' value={confirm_new_password} handleChange={setConfirmNewPassword} />
                        </div>
                    </div>
                    <div className="profile__buttons">
                        <div className="profile__calnel-save">
                            <Button color='white' handleClick={clickCancel}>Отмена</Button>
                            <Button color='red' handleClick={clickSave}>Сохранить</Button>
                        </div>
                        <div className="profile__exit">
                            <Button color='red' handleClick={clickExit}>Выйти из аккауанта</Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    )
}

export default Account
function dispatch(arg0: { type: string; }) {
    throw new Error('Function not implemented.');
}

