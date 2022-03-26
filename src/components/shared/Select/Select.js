import cx from 'classnames';

import styles from './Select.module.scss';

const Select = ({
  name = null,
  id = null,
  value = '',
  placeholder = '',
  options = {},
  isDefaultChecked = false,
  isDisabled = false,
  customClass = null,
  onChange = () => {},
}) => {
  return (
    <select
      className={cx(styles.Container, customClass)}
      name={name}
      id={id}
      value={value}
      disabled={isDisabled}
      onChange={onChange}
    >
      {!isDefaultChecked && (
        <option value="">{placeholder || 'Select...'}</option>
      )}
      {Object.keys(options).map((optionKey, optionIdx) => (
        <option
          key={optionIdx}
          value={optionKey}
          checked={optionKey === value}
          defaultChecked={isDefaultChecked && !optionIdx}
        >
          {options[optionKey]}
        </option>
      ))}
    </select>
  );
};
export default Select;
