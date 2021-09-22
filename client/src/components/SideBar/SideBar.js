import React, { useState, useEffect } from 'react';

import {
  FixedContainer,
  SideBarContainer,
  Logo,
  SideBarTopContainer,
  SideBarHome,
  SideBarHomeIcon,
  SideBarExploreIcon,
  SideBarProfileIcon,
  SideBarExplore,
  SideBarProfile,
  SideBarTweetButton,
  SideBarUserContainer,
  SidebarUserIdEmailBox,
  SideBarUserId,
  SideBarUserEmail,
  SideBarUserPhoto,
  ModalContainer,
} from './SideBar.style.js';
import LogoutModal from '../LogoutModal/LogoutModal';
import CreatePost from '../CreatePost/CreatePost';
import { loginUser } from '../../dummy/dummy.js';

function SideBar({ loginUserInfo }) {
  const [isModal, setIsModal] = useState({
    logOut: false,
    newTweet: false,
  });

  const openCloseModalHandler = (e) => {
    let newIsModal = { ...isModal };
    console.log(e.target.id);
    if (e.target.id === 'logOut') {
      newIsModal.logOut = !newIsModal.logOut;
    } else if (e.target.id === 'newTweet') {
      newIsModal.newTweet = !newIsModal.newTweet;
    } else {
      if (isModal.logOut) {
        newIsModal.logOut = !newIsModal.logOut;
      } else {
        newIsModal.newTweet = !newIsModal.newTweet;
      }
    }
    setIsModal(newIsModal);
  };

  const { logOut, newTweet } = isModal;

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = logOut || newTweet ? 'hidden' : 'overlay';
  }, [logOut, newTweet]);
  return (
    <FixedContainer>
      <SideBarContainer>
        <SideBarTopContainer>
          <Logo src={'/images/logo.svg'} alt="" />
          <nav>
            {/* <Link to="/home"> */}
            <SideBarHome>
              <SideBarHomeIcon src={'/images/home.svg'} alt="" />
              <span>Home</span>
            </SideBarHome>
            {/* </Link> */}
            {/* <Link to="/explore"> */}
            <SideBarExplore>
              <SideBarExploreIcon src={'/images/explore.svg'} alt="" />
              <span>Explore</span>
            </SideBarExplore>
            {/* </Link> */}
            {/* <Link to="/profile"> */}
            <SideBarProfile>
              <SideBarProfileIcon src={'/images/sidebarprofile.svg'} alt="" />
              <span>Profile</span>
            </SideBarProfile>
            {/* </Link> */}
          </nav>
          <SideBarTweetButton id="newTweet" onClick={(e) => openCloseModalHandler(e)}>
            Post
          </SideBarTweetButton>
        </SideBarTopContainer>
        <SideBarUserContainer id="logOut" onClick={(e) => openCloseModalHandler(e)}>
          <SideBarUserPhoto>
            <img id="logOut" src={'/images/userphoto.svg'} alt="" />
          </SideBarUserPhoto>
          <SidebarUserIdEmailBox>
            <SideBarUserId id="logOut">{loginUserInfo.nickname}</SideBarUserId>
            <SideBarUserEmail id="logOut">{loginUserInfo.email}</SideBarUserEmail>
          </SidebarUserIdEmailBox>
        </SideBarUserContainer>
      </SideBarContainer>
      {isModal.logOut ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <LogoutModal openCloseModalHandler={openCloseModalHandler} />
        </ModalContainer>
      ) : null}
      {isModal.newTweet ? (
        <ModalContainer onClick={openCloseModalHandler}>
          <CreatePost openCloseModalHandler={openCloseModalHandler} />
        </ModalContainer>
      ) : null}
    </FixedContainer>
  );
}

export default SideBar;
