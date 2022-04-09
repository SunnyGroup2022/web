import React, {useEffect, useState} from 'react';
import Menu from '../Common/Menu';
import Head from '../Common/Head';
import {getCookie, delCookie} from '../../utils/cookie';
import {useNavigate} from 'react-router-dom';
import config from '../../config';

/**
 * @param {integer} userId - userId
 * @param {string} token - token
 */
async function getUser(userId, token) {
  return fetch(`${config.apiUrl}/v1/user/${userId}`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: {
      'token': token,
    },
  }).then((res) => res.json()).catch((e) => console.log(e));
}

/**
 * @param {integer} userId - userId
 * @param {string} token - token
 * @param {object} body - body
 */
async function updateUser(userId, token, body) {
  return fetch(`${config.apiUrl}/v1/user/${userId}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json()).catch((e) => console.log(e));
}

const Profile = () => {
  const userId = getCookie('userId');
  const token = getCookie('userToken');
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setSuccessMessage();
      setErrorMessage('Name cannot be empty!');
    } else {
      const result = await updateUser(userId, token, {
        name,
      });

      if (result.status === 1) {
        setUserName(name);
        setSuccessMessage('Update success!');
        setErrorMessage(null);
      } else {
        setSuccessMessage(null);
        setErrorMessage('Update failed. Please try again later.');
      }
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getUser(userId, token);
      console.log('userInfo', userInfo);
      if (userInfo && userInfo.id) {
        setUser(userInfo);
        setUserName(userInfo.name);
      } else {
        delCookie('userId');
        delCookie('userToken');
        navigate('/');
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Head />
        <Menu name={userName}/>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="col-md-7 col-lg-8">
            <br/>
            <h4 className="mb-3">User Profile</h4>
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="name"
                      required=""
                      defaultValue={ (user && user.name) || ''}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <hr className="my-4" />
                <div className="col-6">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <h6>{ (user && user.email) || ''}</h6>
                </div>
                <div className="col-6">
                  <label htmlFor="emailVerification" className="form-label">
                    Email Verification
                  </label>
                  <h6>{ user && (user.email_verified ? 'Verified' : 'Unverified')}</h6>
                </div>
                <hr className="my-4" />
                <div className="col-12">
                  <label htmlFor="logins" className="form-label">
                    Logins
                  </label>
                  <h6>{ (user && user.logins) || 0}</h6>
                </div>
                <hr className="my-4" />
                <div className="col-6">
                  <label htmlFor="createdOn" className="form-label">
                    Created On
                  </label>
                  <h6>{ (user && user.created_on) || ''}</h6>
                </div>
                <div className="col-6">
                  <label htmlFor="lastLogin" className="form-label">
                    Last Login
                  </label>
                  <h6>{ (user && user.last_login) || ''}</h6>
                </div>
                <div className="col-md-5">
                  <label htmlFor="lastOnline" className="form-label">
                    Last Online
                  </label>
                  <h6>{ (user && user.last_online) || ''}</h6>
                </div>
              </div>
              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" type="submit">
                Update
              </button>
            </form>
            <br/><br/>
            { errorMessage && <div className="alert alert-danger" role="alert">{ errorMessage }</div> }
            { successMessage && <div className="alert alert-success" role="alert">{ successMessage }</div> }
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
