import { VscAccount } from 'react-icons/vsc';
import styles from '../styles/User.module.css';
import { useContext } from 'react';
import { UserContext } from './store';

export default function user() {
  const [user, setUser] = useContext(UserContext);
  return (
    <div className={styles.wrapper}>
      <VscAccount size={65} />
      <div>{user}</div>
    </div>
  );
}
