import { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const { login } = useMovieContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email) return setError('Please enter an email.');
    if (pwd.length < 6) return setError('Password must be at least 6 characters.');
    login(email);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-form-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password</label>
              <input id="pwd" type="password" value={pwd}
                     onChange={(e) => setPwd(e.target.value)}
                     placeholder="••••••" required minLength={6} />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn auth-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
