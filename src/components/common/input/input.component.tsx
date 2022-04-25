import React, { ChangeEvent, FC, useState } from 'react';
import cx from 'classnames';

import styles from './input.module.scss';

export namespace Input {
  export enum Width {
    Full = 'full',
  }

  export enum Size {
    Medium = 'medium',
  }

  export type Props = Readonly<{
    type?: string;
    placeholder?: string;
    name?: string;
    value?: string;
    label?: string;
    isError?: boolean;
    errorMessage?: Array<string>;
    disabled?: boolean;
    size?: Size;
    width?: Width;
    maxLength?: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
    testId?: string;
  }>;

  export const $: FC<Props> = (props) => {
    const {
      type = 'text',
      placeholder,
      name,
      value = '',
      label,
      isError,
      errorMessage,
      disabled = false,
      size = Size.Medium,
      width,
      maxLength,
      onChange,
      onBlur,
      testId,
    } = props;

    const [filled, setFilled] = useState<boolean>(false);

    const inputClassNames = cx(styles.input, {
      [styles.input_error]: isError && filled,
      [styles.input_labeled]: label,
      [styles.input_width_full]: width === Width.Full,
    });

    const titleClassNames = cx(styles.input__label, {
      [styles.input__label_size_medium]: size === Size.Medium,
    });

    const inputFieldClassNames = cx(styles.input__field, {
      [styles.input__field_size_medium]: size === Size.Medium,
      [styles.input__field_error]: isError && filled,
    });

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setFilled(event.target.value.length === maxLength)
      onChange(event);
    };

    const onBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setFilled(true)
      onBlur?.(event);
    };

    const onFocusHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setFilled(event.target.value.length === maxLength)
    }

    return (
      <div className={inputClassNames}>
        {label && <div className={titleClassNames}>{label}</div>}
        <input
          data-testid={testId}
          className={inputFieldClassNames}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          disabled={disabled}
          maxLength={maxLength}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
        />
        {errorMessage?.length !== 0 && filled && <div className={styles.input__errorMessage}>
          {errorMessage?.map((error, i) => <div key={i}>◦{error}</div>)}
        </div>
        }
      </div>
    );
  };
}
