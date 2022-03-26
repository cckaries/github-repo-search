import cx from 'classnames';

import styles from './Tbody.module.scss';

const Tbody = ({ customClass = null, children = null }) => {
  return (
    <tbody className={cx(styles.Container, customClass)}>{children}</tbody>
  );
};

export default Tbody;
