import { createContext, useState, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import Layout from './layout';

/* initializing context API values */
export const MagicContext = createContext();
export const UserContext = createContext();
export const LoggedInContext = createContext();

/* this function wraps the entire app within the context APIs  */
const Store = ({ children, userInfo, authorized }) => {
  const [user, setUser] = useState(userInfo);
  const [loggedIn, setLoggedIn] = useState(false);
  const [magic, setMagic] = useState();

  useEffect(() => {
    (async () => {
      /*loads Magic as variable*/
      let m = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUB_KEY);
      await setMagic(m);
      /* Check if there is a token on the browser*/
    })();
  }, []);

  // useEffect(() => {
  //   setLoggedIn(authorized);
  // }, [authorized]);

  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <MagicContext.Provider value={[magic]}>
        <UserContext.Provider value={[user, setUser]}>
          <Layout>
            <>
              {/* {navigator.onLine ? ( */}
              {children}
              {/* ) : ( */}
              {/* <div>INTERNET CONNECTION LOST</div> */}
              {/* )} */}
            </>
          </Layout>
        </UserContext.Provider>
      </MagicContext.Provider>
    </LoggedInContext.Provider>
  );
};

export default Store;
