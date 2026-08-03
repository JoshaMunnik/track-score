// region imports

import styles from './Die.module.css';
import type {PropsWithChildren} from "react";

// endregion

// region local

type DieProps = PropsWithChildren<Readonly<{
  label: string;
}>>;

// endregion

// region exports

export function Die({label, children}: Partial<DieProps>) {
  return (
    <div className={styles['die__container']}>
      <div className={styles['die__value']}>
        {children}
      </div>
      <div className={styles['die__label']}>
        {label}
      </div>
    </div>
  );
}

// endregion