import { VscAccount } from 'react-icons/vsc';
import styles from '../styles/User.module.css';

export default function user({ email, profile }) {
  return (
    <div className={styles.wrapper}>
      <VscAccount size={65} />
      <br></br>
      <div>Email:</div>
      <div>{email}</div>
      <br></br>
      <div>Profile: {profile}</div>
    </div>
  );
}
