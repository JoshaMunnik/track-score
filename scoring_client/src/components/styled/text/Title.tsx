// region imports

import styles from './Title.module.css';
import type {PropsWithChildren} from "react";

// endregion

// region local types

type TitleProps = Readonly<PropsWithChildren<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
}>>;

// endregion

// region exports

export function Title({level = 1, children}: Partial<TitleProps>) {
  switch(level) {
    case 1:
      return (<h1 className={`${styles.title} ${styles['title-heading-1']}`}>{children}</h1>);
    case 2:
      return (<h2 className={`${styles.title} ${styles['title-heading-2']}`}>{children}</h2>);
    case 3:
      return (<h3 className={`${styles.title} ${styles['title-heading-3']}`}>{children}</h3>);
    case 4:
      return (<h4 className={`${styles.title} ${styles['title-heading-4']}`}>{children}</h4>);
    case 5:
      return (<h5 className={`${styles.title} ${styles['title-heading-5']}`}>{children}</h5>);
    case 6:
      return (<h6 className={`${styles.title} ${styles['title-heading-6']}`}>{children}</h6>);
  }
}

// endregion