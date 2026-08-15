// region imports

import styles from './ScrollablePage.module.css';
import  {type PropsWithChildren} from "react";
import * as React from "react";

// endregion

// region local types

type ScrollablePageProps = Readonly<PropsWithChildren<{
  top: React.ReactNode;
}>>;

// endregion

// region exports

export function ScrollablePage({top, children}: ScrollablePageProps) {
  return (
    <div className={styles['scrollable-page']}>
      <div className={styles.top}>
        {top}
      </div>
      <div className={styles.bottom}>
        {children}
      </div>
    </div>
  )
}

// endregion