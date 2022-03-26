import { forwardRef } from 'react';
import cx from 'classnames';

import styles from './Tbody.module.scss';

const Tbody = forwardRef(
  ({ customClass = null, children = null, onScroll = () => {} }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cx(styles.Container, customClass)}
        onScroll={onScroll}
      >
        {children}
      </tbody>
    );
  }
);

export default Tbody;
