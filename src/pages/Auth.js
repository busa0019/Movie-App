import { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useMovieContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    login({ email });
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form" style={{ maxWidth: 420 }}>
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: 10 }}
            />
          </div>
          {error && <div className="error-message" style={{ marginBottom: 12 }}>{error}</div>}
          <button type="submit" className="btn auth-btn">Log In</button>
        </form>
      </div>
    </div>
  );
}
