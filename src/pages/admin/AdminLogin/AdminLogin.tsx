import {
  useState,
  type FormEvent,
} from 'react';

import { loginAdmin } from '../../../services/adminApi';

import './AdminLogin.scss';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError('');
    setLoading(true);

    try {
      const result = await loginAdmin({
        email,
        password,
      });

      localStorage.setItem(
        'adminToken',
        result.token,
      );

      window.location.href = '/admin/reviews';
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Login failed.',
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <main className="admin-login">
    <div className="admin-login__container">
      <form
        className="admin-login__form"
        onSubmit={handleSubmit}
      >
        <h1 className="admin-login__title">
          Admin Login
        </h1>

        <div className="admin-login__field">
          <label
            className="admin-login__label"
            htmlFor="email"
          >
            Email
          </label>

          <input
            className="admin-login__input"
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <div className="admin-login__field">
          <label
            className="admin-login__label"
            htmlFor="password"
          >
            Password
          </label>

          <input
            className="admin-login__input"
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />
        </div>

        {error && (
          <p className="admin-login__error">
            {error}
          </p>
        )}

        <button
          className="admin-login__button"
          type="submit"
          disabled={loading}
        >
          {loading
            ? 'Logging in...'
            : 'Login'}
        </button>
      </form>
    </div>
  </main>
);
};

export default AdminLogin;