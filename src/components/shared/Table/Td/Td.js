import cx from 'classnames';

import styles from './Td.module.scss';

const Td = ({ customClass = null, children = null }) => {
  return <td className={cx(styles.Container, customClass)}>{children}</td>;
};

export default Td;
