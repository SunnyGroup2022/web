import React, {useState, useEffect} from 'react';
import LoginBtn from '../Common/Auth0Login';
import {setCookie, getCookie} from '../../utils/cookie';
import {useNavigate} from 'react-router-dom';
import config from '../../config';

/**
 * @param {object} userInfo - userInfo
 */
async function userSignUp(userInfo) {
  return fetch(`${config.apiUrl}/v1/user/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  }).then((res) => res.json()).catch((e) => alert(e));
}

/**
 * @return {object}
 */
export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
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

    if (password!==password2) {
      setErrorMessage('The password confirmation does not match.');
      return;
    }

    const check = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,20}$');

    if (!check.test(password)) {
      setErrorMessage(`At least 8 characters in length, must include lowercase letter, uppercase letter, digit and special character.`);
      return;
    }

    const result = await userSignUp({
      email,
      password,
      password2,
    });

    if (result && result.token) {
      setCookie('userToken', result.token, result.expireTime);
      setCookie('userId', result.userId, result.expireTime);
      setErrorMessage(null);
      navigate('/dashboard');
    } else {
      setErrorMessage(result && result.message ? result.messages : 'Sign up failed. Please try again later.');
    };
  };

  return (
    <div className="text-center signinbox" data-new-gr-c-s-check-loaded="14.1054.0" data-gr-ext-installed>
      <main className="form-signin">
        <form onSubmit={handleSubmit} >
          <img className="mb-4" src="https://master.d2w5ix9s0dasc.amplifyapp.com/static/media/logo.b4ed8b4fd1a1c9833b5f.png" alt="" width={72} height={72} />
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
          <div className="form-floating">
            <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="password2" placeholder="Password" onChange={(e) => setPassword2(e.target.value)}/>
            <label htmlFor="floatingPassword">Confirm Password</label>
          </div>
          <div className="form-floating">
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
          </div>
        </form>
        <LoginBtn />
        <br/>
        { errorMessage && <div className="alert alert-danger" role="alert" dangerouslySetInnerHTML={{__html: errorMessage}}></div> }
        <p></p>
      </main>
    </div>
  );
}
