import styles from '../styles/Side_nav.module.css';
import Link from 'next/link';
import User from './user';

import { BiHomeSmile, BiTachometer } from 'react-icons/bi';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { GiFactory } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';

import { useContext } from 'react';
import { UserContext } from './store';

export default function side_bar() {
  const [user] = useContext(UserContext);
  return (
    <div className={styles.wrapper}>
      {console.log('==>', user)}
      {user && <User email={user.email} profile={user.profile} />}
      <ul className={styles.list}>
        {/* <Link href='/'>
          <a>
            <li>
              <BiHomeSmile className={styles.icons} />
              HOME
            </li>
          </a>
        </Link> */}
        <Link href="/">
          <a>
            <li>
              <BiTachometer className={styles.icons} />
              Dashboard
            </li>
          </a>
        </Link>
        <Link href="/todos">
          <a>
            <li>
              <AiOutlineUnorderedList className={styles.icons} />
              To-dos
            </li>
          </a>
        </Link>
        <Link href="/assets">
          <a>
            <li>
              <GiFactory className={styles.icons} />
              Assets
            </li>
          </a>
        </Link>
        {user.profile === 'admin' && (
          <Link href="/account">
            <a>
              <li>
                <VscAccount className={styles.icons} />
                Accounts
              </li>
            </a>
          </Link>
        )}
      </ul>
    </div>
  );
}
