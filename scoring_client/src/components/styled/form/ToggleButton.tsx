import styles from './ToggleButton.module.css';
import type {PropsWithChildren} from "react";

type ToggleProps = PropsWithChildren & Readonly<{
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  readonly?: boolean;
}>;

/**
 * A button with an on and off state.
 */
export function ToggleButton({
  value,
  onChange,
  children,
  disabled = false,
  readonly = false
}: ToggleProps) {
  return (
    <label className={styles['toggle-container']}>
      <input
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={() => {
        }}
        onClick={(event) => {
          event.preventDefault();
          if (onChange && !readonly) {
            setTimeout(
              () => onChange(!value),
              0
            );
          }
        }}
        className={styles['toggle-checkbox']}
      />
      <span className={styles['toggle-visual']}>
        {children}
      </span>
    </label>
  );
}
