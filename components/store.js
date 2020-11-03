import { createContext, useState, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import Layout from './layout';

/* initializing context API values */
export const MagicContext = createContext();
export const UserContext = createContext();
export const LoggedInContext = createContext();

/* this function wraps our entire app within our context APIs so they all have access to their values */
const Store = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [magic, setMagic] = useState();

  useEffect(() => {
    (async () => {
      let m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY);
      await setMagic(m);
      const data = await fetch('/api/user');
      const response = await data.json();
      if (data.ok) {
        setUser(response.email);
        setLoggedIn(true);
      }
    })();
  }, []);

  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <MagicContext.Provider value={[magic]}>
        <UserContext.Provider value={[user, setUser]}>
          <div>
            {/* <div>==> USER: {JSON.stringify(user)}</div> */}
            <Layout>
              <>{children}</>
            </Layout>
          </div>
        </UserContext.Provider>
      </MagicContext.Provider>
    </LoggedInContext.Provider>
  );
};

export default Store;
