import cx from 'classnames';

import styles from './Table.module.scss';

const Table = ({ isLoading = false, customClass = null, children = null }) => {
  return (
    <table className={cx(styles.Container, customClass)}>
      {isLoading ? <div>Loading...</div> : children}
    </table>
  );
};

export default Table;
