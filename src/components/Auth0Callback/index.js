import {useState} from 'react';
import {useAuth0} from '@auth0/auth0-react';
import {setCookie} from '../../utils/cookie';
import {useNavigate} from 'react-router-dom';

/**
 * @param {object} credentials - credentials
 */
async function userAuthLogin(credentials) {
  return fetch('http://localhost:3838/v1/user/auth0Login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((res) => res.json()).catch((e) => alert(e));
}

/**
 * @return {object} credentials - credentials
 */
export default function Auth0Callback() {
  const {isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const userLogin = async () => {
    const accessToken = await getAccessTokenSilently();
    const result = await userAuthLogin({
      accessToken,
    });
    if (result && result.token && result.userId) {
      setCookie('userToken', result.token);
      setCookie('userId', result.userId);
      navigate('/dashboard');
    } else {
      setErrorMessage('Auth0 error! Please try again later');
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    }
  };

  if (isAuthenticated) {
    userLogin();
  }

  return (
    <div className="text-center signinbox" data-new-gr-c-s-check-loaded="14.1054.0" data-gr-ext-installed>
      <main className="form-signin">
        { (isLoading && !errorMessage) &&
        <div className="text-center">
          <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
            <span className="sr-only"></span>
          </div>
        </div>
        }
        { errorMessage && <div className="alert alert-danger" role="alert">{ errorMessage }</div> }
      </main>
    </div>
  );
}
