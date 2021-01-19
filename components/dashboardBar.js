import { useState } from 'react';
import styles from '../styles/dashboardBar.module.css';
// import { IoToday } from 'react-icons/io5';
// import { IoAccessibilityOutline } from 'react-icons/io5';
import { IoToday } from 'react-icons/io5';
import { FaCalendarWeek } from 'react-icons/fa';
import { CgViewMonth } from 'react-icons/cg';

export default function dashboardBar() {
  const [calendar, setCalendar] = useState(new Date());
  return (
    <div className={styles.wrapper}>
      <div className={styles.date}>
        {new Intl.DateTimeFormat('en-US').format(calendar)}
      </div>
      <div className={styles.buttons}>
        <button className={styles.button}>
          <IoToday size="45" />
        </button>
        <button className={styles.button}>
          <FaCalendarWeek size="45" />
        </button>
        <button className={styles.button}>
          <CgViewMonth size="45" />
        </button>
      </div>
    </div>
  );
}
