import React, {useState} from 'react';
import Menu from '../Common/Menu';
import Head from '../Common/Head';
import {getCookie} from '../../utils/cookie';
import config from '../../config';

/**
 * @param {integer} userId - userId
 * @param {string} token - token
 * @param {object} body - body
 */
async function updateUser(userId, token, body) {
  return fetch(`${config.apiUrl}/v1/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'token': token,
    },
    body: JSON.stringify(body),
  }).then((res) => res.json()).catch((e) => console.log(e));
}

const ChangePassword = () => {
  const userId = getCookie('userId');
  const token = getCookie('userToken');
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !password || (password !== password2)) {
      setSuccessMessage();
      setErrorMessage('The password confirmation does not match.');
      return;
    }

    const check = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,20}$');

    if (!check.test(password)) {
      setErrorMessage(`The password must contains at least one lower character, 
        one upper character, 
        one digit character, 
        one special character and must contains at least 8 characters`);
      return;
    }

    const result = await updateUser(userId, token, {
      oldPassword,
      password,
      password2,
    });

    if (result.status === 1) {
      setSuccessMessage('Password update success!');
      setErrorMessage(null);
    } else {
      setSuccessMessage(null);
      setErrorMessage((result && result.message) || 'Password update failed. Please try again later.');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Head />
        <Menu />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="col-md-7 col-lg-8">
            <br/>
            <h4 className="mb-3">User Profile</h4>
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <div className="input-group has-validation">
                    <input
                      type="password"
                      className="form-control"
                      id="name"
                      placeholder="Old Password"
                      required=""
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="password" className="form-label">New Password</label>
                  <div className="input-group has-validation">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="New Password"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="password2" className="form-label">
                    Password Comfirmation
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="password"
                      className="form-control"
                      id="password2"
                      placeholder="Password Comfirmation"
                      required=""
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </div>
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

export default ChangePassword;
