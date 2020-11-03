import { useContext } from 'react';
import { BiExit } from 'react-icons/bi';
import { AiOutlineAlert } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';
import { MagicContext, UserContext } from '../store';
import { LoggedInContext } from '../store';
import styles from '../../styles/Menu_items.module.css';

export default function menu_items() {
  const [user, setUser] = useContext(UserContext);
  const [magic] = useContext(MagicContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  const handleLogout = async () => {
    await fetch(`/api/user/logout`, {
      method: 'GET',
    });
    setUser(null);
    setLoggedIn(false);
    await magic.user.logout();
  };

  return (
    <>
      <div className={styles.desktop}>
        <button className={styles.iconButton}>
          <AiOutlineAlert size={30} color='white' />
        </button>
        <button
          className={styles.iconButton}
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          <BiExit size={30} color='white' />
        </button>
      </div>
      <AiOutlineMenu size={35} color='white' className={styles.mobile} />
    </>
  );
}
