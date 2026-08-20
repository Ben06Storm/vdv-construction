import {
  useState,
  type FormEvent,
} from 'react';

import { loginAdmin } from '../../../services/adminApi';

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
    <main>
      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />
        </div>

        <div>
          <label htmlFor="password">
            Password
          </label>

          <input
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
          <p>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  );
};

export default AdminLogin;