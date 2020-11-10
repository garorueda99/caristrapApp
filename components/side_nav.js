import styles from '../styles/Side_nav.module.css';
import Link from 'next/link';
import User from './user';
import { BiHomeSmile, BiTachometer } from 'react-icons/bi';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { GiFactory } from 'react-icons/gi';
import { VscAccount } from 'react-icons/vsc';

export default function side_bar() {
  return (
    <div className={styles.wrapper}>
      <User />
      <ul className={styles.list}>
        {/* <Link href='/'>
          <a>
            <li>
              <BiHomeSmile className={styles.icons} />
              HOME
            </li>
          </a>
        </Link> */}
        <Link href='/dashboard'>
          <a>
            <li>
              <BiTachometer className={styles.icons} />
              Dashboard
            </li>
          </a>
        </Link>
        <Link href='/todos'>
          <a>
            <li>
              <AiOutlineUnorderedList className={styles.icons} />
              To-dos
            </li>
          </a>
        </Link>
        <Link href='/assets'>
          <a>
            <li>
              <GiFactory className={styles.icons} />
              Assets
            </li>
          </a>
        </Link>
        <Link href='/account'>
          <a>
            <li>
              <VscAccount className={styles.icons} />
              Account
            </li>
          </a>
        </Link>
      </ul>
    </div>
  );
}
