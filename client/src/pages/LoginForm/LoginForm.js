import React, { useEffect, useState } from 'react';
import InputLogin from '../../components/InputLogin/InputLogin';
import InputPwd from '../../components/InputPwd/InputPwd';
import { dummy } from '../../dummy/dummy';
import Home from '../Home/Home';
import axios from 'axios';

import {
  ModalContainer,
  TwitterLoginText,
  LogoContainer,
  Container,
  Logo,
  LoginWarning,
  LoginButton,
  Register,
  ForgotPwd,
  LoginButtonContainer,
  BottomContainer,
  PullContainer,
  TestHomePage,
} from '../LoginForm/LoginForm.style';
import ForgotPasswordModal from '../../components/ForgotPasswordModal/ForgotPasswordModal';
import SignupForm from '../../components/SignupForm/SignupForm';

function LoginForm({
  isValid,
  setIsValid,
  handleLoginButton,
  setInputId,
  setInputPw,
  inputPw,
  inputId,
}) {
  const [Isdisabled, setIsDisabled] = useState(true);

  const [isModal, setIsModal] = useState({
    forgotPassword: false,
    signUp: false,
  });

  const openCloseModalHandler = (e) => {
    let newIsModal = { ...isModal };

    if (e.target.name === 'forgotPassword') {
      newIsModal.forgotPassword = !newIsModal.forgotPassword;
    } else if (e.target.name === 'signUp') {
      newIsModal.signUp = !newIsModal.signUp;
    } else {
      if (isModal.forgotPassword) {
        newIsModal.forgotPassword = !newIsModal.forgotPassword;
      } else {
        newIsModal.signUp = !newIsModal.signUp;
      }
    }
    setIsModal(newIsModal);
  };

  const { forgotPassword, signUp } = isModal;

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = forgotPassword || signUp ? 'hidden' : 'auto';
  }, [forgotPassword, signUp]);

  const handleInputId = (e) => {
    setInputId(e.target.value);
    if (inputId.length > 0 && inputPw.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    if (window.event.keyCode === 13) {
      return handleLoginButton(e);
    }
    setIsValid(false);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);

    if (inputId.length > 0 && inputPw.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    if (window.event.keyCode === 13) {
      return handleLoginButton(e);
    }
    setIsValid(false);
  };

  return (
    <>
      <PullContainer>
        <Container>
          <LogoContainer>
            <Logo src={'/images/logo.svg'} />
          </LogoContainer>

          <TwitterLoginText>pippy 로그인</TwitterLoginText>
          {!isValid ? (
            ''
          ) : (
            <LoginWarning>
              <div>
                이메일과 비밀번호를 확인하신 후 <br></br>
                다시 로그인 해 주세요.
              </div>
            </LoginWarning>
          )}
          <form>
            <InputLogin inputId={inputId} handleInputId={handleInputId} />
            <InputPwd inputPw={inputPw} handleInputPw={handleInputPw} />
            <LoginButtonContainer>
              <LoginButton disabled={Isdisabled} onClick={(e) => handleLoginButton(e)}>
                로그인
              </LoginButton>
            </LoginButtonContainer>
          </form>
          <BottomContainer>
            <ForgotPwd
              name={'forgotPassword'}
              onClick={(e) => {
                openCloseModalHandler(e);
              }}
            >
              비밀번호를 잊으셨나요?
            </ForgotPwd>
            <Register
              name={'signUp'}
              onClick={(e) => {
                openCloseModalHandler(e);
              }}
            >
              <b>pippy</b> 가입
            </Register>
          </BottomContainer>
        </Container>

        {isModal.forgotPassword ? (
          <ModalContainer onClick={openCloseModalHandler}>
            <ForgotPasswordModal
              openCloseModalHandler={openCloseModalHandler}
            ></ForgotPasswordModal>
          </ModalContainer>
        ) : null}
        {isModal.signUp ? (
          <ModalContainer onClick={openCloseModalHandler}>
            <SignupForm openCloseModalHandler={openCloseModalHandler}></SignupForm>
          </ModalContainer>
        ) : null}
      </PullContainer>
    </>
  );
}
export default LoginForm;
