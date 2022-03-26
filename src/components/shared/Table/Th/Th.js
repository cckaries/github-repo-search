import cx from 'classnames';

import styles from './Th.module.scss';

const Th = ({ customClass = null, children = null }) => {
  return <th className={cx(styles.Container, customClass)}>{children}</th>;
};

export default Th;
