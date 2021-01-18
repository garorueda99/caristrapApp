import { VscAccount } from 'react-icons/vsc';
import styles from '../styles/User.module.css';
import { useContext } from 'react';

export default function user({ email, profile }) {
  return (
    <div className={styles.wrapper}>
      <VscAccount size={65} />
      <br></br>
      <div>Email: {email}</div>
      <br></br>
      <div>Profile: {profile}</div>
    </div>
  );
}
