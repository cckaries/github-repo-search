import cx from 'classnames';

import styles from './Tr.module.scss';

const Tr = ({
  id,
  isHidden = false,
  isClickable = false,
  customClass = null,
  children = null,
  onClick = () => {},
}) => {
  return (
    <tr
      id={id}
      className={cx(
        styles.Container,
        isHidden ? styles.hidden : styles.shown,
        isClickable && styles.clickable,
        customClass
      )}
      onClick={e => isClickable && onClick(e)}
    >
      {children}
    </tr>
  );
};

export default Tr;
