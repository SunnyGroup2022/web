import React, {useState, useEffect} from 'react';
import LoginBtn from '../Common/Auth0Login';
import {setCookie, getCookie} from '../../utils/cookie';
import {useNavigate} from 'react-router-dom';
import config from '../../config';

/**
 * @param {object} credentials - credentials
 */
async function userLogin(credentials) {
  return fetch(`${config.apiUrl}/v1/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  }).then((res) => res.json()).catch((e) => alert(e));
}

/**
 * @return {object}
 */
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const userId = getCookie('userId');
    const token = getCookie('userToken');

    if (userId && token) {
      navigate('/dashboard');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await userLogin({
      email,
      password,
    });

    if (result.token) {
      setCookie('userToken', result.token, result.expireTime);
      setCookie('userId', result.userId, result.expireTime);
      navigate('/dashboard');
    } else {
      setErrorMessage('Incorrect email address or password.');
    }
  };

  return (
    <div className="text-center signinbox" data-new-gr-c-s-check-loaded="14.1054.0" data-gr-ext-installed>
      <main className="form-signin">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src="https://master.d2w5ix9s0dasc.amplifyapp.com/static/media/logo.b4ed8b4fd1a1c9833b5f.png" alt="" width={72} height={72} />
          <h1 className="h3 mb-3 fw-normal">Please sign In</h1>
          <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          </div>
        </form>
        <LoginBtn />
        <p></p>
        { errorMessage && <div className="alert alert-danger" role="alert">{ errorMessage }</div> }
      </main>
    </div>
  );
}

