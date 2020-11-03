// import MenuItems from './main_nav_menu_items';
import styles from '../../styles/Top_nav.module.css';

export default function main_nav() {
  return (
    <nav className={styles.nav}>
      <div>
        <img src='/logo.svg' className={styles.nav_logo} alt='Logo' />
      </div>

      {/* <MenuItems /> */}
    </nav>
  );
}
