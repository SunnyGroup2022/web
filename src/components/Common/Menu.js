import {getCookie, delCookie} from '../../utils/cookie';
import Logout from './Logout';
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

/**
 * @param {integer} userId - userId
 * @param {string} token - token
 */
async function getUser(userId, token) {
  return fetch(`http://localhost:3838/v1/user/${userId}`, {
    method: 'GET',
    headers: {
      'token': token,
    },
  }).then((res) => res.json()).catch((e) => console.log(e));
}

/**
 * @param {string} token - token
 */
async function sendmail(token) {
  return fetch(`http://localhost:3838/v1/user/sendmail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    body: JSON.stringify({type: 1}),
  }).then((res) => res.json()).catch((e) => console.log(e));
}

/**
 * @param {object} props - props
 * @return {object}
 */
export default function Menu(props) {
  const navigate = useNavigate();
  const [isEmailVerified, setEmailVerified] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [user, setUser] = useState();

  const clickSendMail = async (e) => {
    const res = await sendmail(getCookie('userToken'));
    if (res.status === 1) {
      setSuccessMessage('Please receive email to verify your email address');
      setErrorMessage(null);
    } else {
      setErrorMessage('System error! Please try again later');
      setSuccessMessage(null);
    }
  };

  useEffect(() => {
    const userId = getCookie('userId');
    const token = getCookie('userToken');

    if (!userId || !token) {
      navigate('/');
    }

    const getUserInfo = async () => {
      const userInfo = await getUser(userId, token);
      if (userInfo && userInfo.id) {
        setUser(userInfo);
        if (userInfo.email_verified === 1) {
          setEmailVerified(true);
        } else {
          setEmailVerified(false);
        }
      } else {
        delCookie('userId');
        delCookie('userToken');
        navigate('/');
      }
    };

    getUserInfo();
  }, []);

  return (
    <>
      {
        (isEmailVerified === true) &&
        <nav
          id="sidebarMenu"
          className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        >
          <div className="position-sticky pt-3">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted" style={{fontSize: '14px'}}>
              <span>Hi! { props.name || user.name || 'Anonymous'}</span>
            </h6>
            <br/>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-home"
                    aria-hidden="true"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-users"
                    aria-hidden="true"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx={9} cy={7} r={4} />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/changePassword">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-file-text"
                    aria-hidden="true"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1={16} y1={13} x2={8} y2={13} />
                    <line x1={16} y1={17} x2={8} y2={17} />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Change Password
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-layers"
                    aria-hidden="true"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                  <Logout/ >
                </a>
              </li>
            </ul>
          </div>
        </nav>
      }
      {
        (isEmailVerified === false) &&
        <div className="text-center signinbox" data-new-gr-c-s-check-loaded="14.1054.0" data-gr-ext-installed style={{height: '100%'}}>
          <main className="form-signin">
            <h2>Please verify your email address.</h2>
            <br/>
            <button type="button" className="btn btn-primary" style={{'fontSize': '25px'}} onClick={() => clickSendMail()}>
              Resend Email Verification
            </button>
            <br/>
            <br/>
            { errorMessage && <div className="alert alert-danger" style={{'fontSize': '16px'}} role="alert">{ errorMessage }</div> }
            { successMessage && <div className="alert alert-success" style={{'fontSize': '16px'}} role="alert">{ successMessage }</div> }
          </main>
        </div>
      }
    </>
  );
}
