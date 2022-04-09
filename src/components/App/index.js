import {useNavigate, Link} from 'react-router-dom';
import {getCookie} from '../../utils/cookie';
import {useEffect} from 'react';
import './index.css';
import logo from './logo.png';

/**
 * @return {object}
 */
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getCookie('userId');
    const token = getCookie('userToken');

    if (userId && token) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="display-5 fw-bold">Simple Test App</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">It is a test app for Aha! Please choose to sign up or sign in right now!</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/login">
              <button type="button" className="btn btn-primary btn-lg px-4">Sign In</button>
            </Link>
            <Link to="/signup">
              <button type="button" className="btn btn-outline-primary btn-lg px-4">Sign Up</button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
