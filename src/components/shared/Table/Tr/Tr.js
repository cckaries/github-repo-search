import cx from 'classnames';

import styles from './Tr.module.scss';

const Tr = ({
  id,
  isAnimationActive = false,
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
        isAnimationActive && styles.animationActive,
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
