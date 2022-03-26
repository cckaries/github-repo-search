import cx from 'classnames';

import styles from './Tbody.module.scss';

const Tbody = ({
  customClass = null,
  children = null,
  onScroll = () => {},
}) => {
  return (
    <tbody className={cx(styles.Container, customClass)} onScroll={onScroll}>
      {children}
    </tbody>
  );
};

export default Tbody;
