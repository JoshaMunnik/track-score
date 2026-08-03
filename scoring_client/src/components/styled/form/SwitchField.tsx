import styles from './SwitchField.module.css';

type SwitchProps = Readonly<{
  value: boolean;
  onChange?: (value: boolean) => void;
}>;

export function SwitchField({value, onChange}: SwitchProps) {
  return (
    <label className={styles['switch-container']}>
      <input
        type="checkbox"
        checked={value}
        onChange={() => {}}
        onClick={(event) => {
          event.preventDefault();
          if (onChange) {
            setTimeout(
              () => onChange(!value),
              0
            );
          }
        }}
        className={styles['switch-checkbox']}
      />
      <span className={styles['switch-visual']}></span>
    </label>
  );
}
