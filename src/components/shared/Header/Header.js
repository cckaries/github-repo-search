import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.Container}>
      <h1>GitHub Repositories</h1>
    </header>
  );
};

export default Header;
