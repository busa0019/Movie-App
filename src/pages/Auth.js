import { useState } from 'react';
import { useMovieContext } from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const { login } = useMovieContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // In a real app, you would send this to your backend
      // For demo purposes, we'll just check for any credentials
      const success = login(email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-form-container">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email-ID here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password here..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="btn auth-btn">
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          
          <div className="auth-switch">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button" 
                className="switch-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}