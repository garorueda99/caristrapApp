import styles from '../styles/Login.module.css';
import { useContext } from 'react';
import { MagicContext, UserContext, LoggedInContext } from './store';
// import useAuth from '../hooks/useAuth';

export default function Login() {
  const [magic] = useContext(MagicContext);
  const [user, setUser] = useContext(UserContext);
  const [loggedin, setLoggedIn] = useContext(LoggedInContext);
  // const { user: userFromBE, loading } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { elements } = event.target;

    //check token

    // Add the Magic code here
    const did = await magic.auth.loginWithMagicLink({
      email: elements.email.value,
    });

    const authRequest = await fetch('/api/user/login', {
      method: 'POST',
      headers: new Headers({ Authorization: `Bearer ${did}` }),
    });

    if (authRequest.ok) {
      setLoggedIn(true);
    } else {
      /* handle errors */
    }
  };

  return (
    <div className={styles.container}>
      {user}
      <main className={styles.main}>
        <h1 className={styles.title}>Caristrap Maintenance App</h1>

        <p className={styles.description}>Get started by</p>
        <div className={styles.loginWrapper}>
          <form onSubmit={handleSubmit} className={styles.card}>
            <label htmlFor='email' className={styles.description}>
              Your Caristrap Email:{' '}
            </label>
            <input name='email' type='email' className={styles.email} />
            <button className={styles.button}>Log in</button>
          </form>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href='http://caristrap.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/cLogo.gif' alt='Caristrap Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
