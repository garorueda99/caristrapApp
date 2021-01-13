import '../styles/globals.css';
import { useState, useEffect } from 'react';
import Store from '../components/store';

function MyApp({ Component, pageProps }) {
  const [authorized, setAuthorized] = useState(false);

  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  );
}

export default MyApp;
