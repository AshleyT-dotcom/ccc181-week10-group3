// GIVEN FILE: your job is the CSS in src/styles/. Do not edit .tsx files
// (if you must, tell your group first). Class names are fixed; style them.
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import BrandPanel from './components/BrandPanel';
import LoginForm from './components/LoginForm';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import { login, getMe, type User } from './api/auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Stay logged in kung i-refresh
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) return;
    getMe(token)
      .then(setUser)
      .catch(() => sessionStorage.removeItem('token'));
  }, []);

  async function handleLogin(email: string, password: string) {
    setError('');
    setLoading(true);
    try {
      const { token, user } = await login(email, password);
      sessionStorage.setItem('token', token);
      setUser(user); // Welcome screen mogawas lang human sa API 200
    } catch (e) {
      const code = (e as Error).message;
      if (code === 'INVALID') setError('Wrong email or password.');
      else if (code === 'NETWORK') setError('Cannot reach the server. Please try again.');
      else setError('Something went wrong on our side. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('token');
    setUser(null);
    setError('');
  }

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        {user ? (
          <Welcome user={user} onLogout={handleLogout} />
        ) : (
          <div className="login-layout">
            <BrandPanel />
            <LoginForm onLogin={handleLogin} loading={loading} error={error} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}