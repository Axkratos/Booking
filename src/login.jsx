import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const response = await fetch('http://localhost:8000/api/v1/auth/google', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/success'); // Redirect using react-router
    } else {
      setMessage('Login failed, please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin} style={styles.button}>
        Sign in with Google
      </button>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Basic styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4285F4',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    color: 'green',
  },
};

export default Login;
