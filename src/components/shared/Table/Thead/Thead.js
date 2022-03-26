import cx from 'classnames';

import styles from './Thead.module.scss';

const Thead = ({ customClass = null, children = null }) => {
  return (
    <thead className={cx(styles.Container, customClass)}>{children}</thead>
  );
};

export default Thead;
