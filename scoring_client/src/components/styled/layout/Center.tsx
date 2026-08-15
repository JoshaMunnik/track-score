// region imports

import type {PropsWithChildren} from 'react';
import styles from './Center.module.css';

// endregion

// region local types

type CenteredProps = PropsWithChildren<{
  className?: string
}>;

// endregion

// region exports

/**
 * Centers the children within the parent container.
 */
export function Center({children, className}: CenteredProps) {
  const centerClassName = className
    ? `${styles.center} ${className}`
    : styles.center;
  return <div className={centerClassName}>{children}</div>;
}

// endregion