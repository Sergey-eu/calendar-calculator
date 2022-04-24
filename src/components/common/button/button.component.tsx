import React, { FC } from 'react';
import cx from 'classnames';

import styles from './button.module.scss';

export namespace Button {
  export enum Width {
    Full = 'full',
  }

  export enum Size {
    Medium = 'medium',
  }

  export enum Theme {
    Primary = 'primary',
  }

  export type Props = Readonly<{
    label: string;
    onClick: () => void;
    theme?: Theme;
    width?: Width;
    size?: Size;
    disabled?: boolean;
    testId?: string;
  }>;

  export const $: FC<Props> = (props) => {
    const {
      label,
      onClick,
      disabled,
      theme = Theme.Primary,
      size = Size.Medium,
      width = null,
      testId,
    } = props;

    const rootClasses = cx(styles.button, {
      [styles.button_size_medium]: size === Size.Medium,

      [styles.button_theme_primary]: theme === Theme.Primary,

      [styles.button_width_full]: width === Width.Full,
    });

    return (
      <button type="button" className={rootClasses} onClick={onClick} disabled={disabled} data-testid={testId}>
        <span className={styles.button__label}>
          {label}
        </span>
      </button>
    );
  };
}
