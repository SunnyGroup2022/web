import React, {useEffect, useState} from 'react';
import qs from 'qs';
import {useLocation, useNavigate} from 'react-router-dom';
import config from '../../config';

/**
 * @param {string} code - code
 */
async function userVerify(code) {
  return fetch(`${config.apiUrl}/v1/user/verify?code=${code}`, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json()).catch((e) => console.log(e));
}

/**
 * @return {object}
 */
export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVerifyEmailApi = async () => {
      const qsObj = qs.parse(location.search, {ignoreQueryPrefix: true});
      if (!qsObj.code) {
        setErrorMessage('Code invalid');
      }

      const result = await userVerify(qsObj.code);
      if (result && result.status===1 ) {
        setErrorMessage(null);
        setSuccessMessage('Your email address has been verified');
        setTimeout(() => {
          navigate('/dashboard');
        }, 4000);
      } else {
        setSuccessMessage(null);
        setErrorMessage('Verification failed');
      }
    };

    fetchVerifyEmailApi();
    setIsLoading(false);
  }, []);
  return (
    <div className="text-center signinbox" data-new-gr-c-s-check-loaded="14.1054.0" data-gr-ext-installed>
      <main className="form-signin">
        { isLoading &&
          <div className="text-center">
            <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        }
        { errorMessage && <div className="alert alert-danger" role="alert">{ errorMessage }</div> }
        { successMessage && <div className="alert alert-success" role="alert">{ successMessage }</div> }
      </main>
    </div>
  );
}
