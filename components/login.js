import styles from '../styles/Login.module.css';
import { useContext, useEffect } from 'react';
import { MagicContext, UserContext, LoggedInContext } from './store';
import { useRouter } from 'next/router';

export default function Login() {
  const [magic] = useContext(MagicContext);
  const [user, setUser] = useContext(UserContext);
  const [loggedin, setLoggedIn] = useContext(LoggedInContext);
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { elements } = event.target;

    // Add the Magic code here
    const did = await magic.auth.loginWithMagicLink({
      email: elements.email.value,
    });

    //Post token in pc - cookie
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
