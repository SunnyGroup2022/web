import {useAuth0} from '@auth0/auth0-react';

const LoginButton = () => {
  const {loginWithRedirect} = useAuth0();
  return (
    <div>
      <button className="w-100 btn btn-lg btn-outline-primary" onClick={() => loginWithRedirect()}>Social Login...</button>
    </div>
  );
};

export default LoginButton;
