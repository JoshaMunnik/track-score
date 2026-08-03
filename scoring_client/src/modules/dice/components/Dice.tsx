// region imports

import styles from './Dice.module.css';
import {type PropsWithChildren} from "react";

// endregion

// region exports

export function Dice({children}: PropsWithChildren) {
  return (
    <div
      className={styles['dice']}
    >
      {children}
    </div>
  );
}

// endregion