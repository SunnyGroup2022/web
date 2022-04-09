import {useAuth0} from '@auth0/auth0-react';
import React from 'react';
import {delCookie} from '../../utils/cookie';

const LogoutButton = () => {
  const {logout} = useAuth0();

  const clickLogout = async () => {
    delCookie('userToken');
    delCookie('userId');
  };

  return (
    <span onClick={() => {
      clickLogout();
      logout({returnTo: window.location.origin});
    }}>Logout</span>
  );
};

export default LogoutButton;
