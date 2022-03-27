import cx from 'classnames';

import styles from './Thead.module.scss';

const Thead = ({ customClass = null, children = null, onClick = () => {} }) => {
  return (
    <thead className={cx(styles.Container, customClass)} onClick={onClick}>
      {children}
    </thead>
  );
};

export default Thead;
