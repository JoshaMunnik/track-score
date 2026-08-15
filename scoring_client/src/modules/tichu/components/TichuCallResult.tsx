// region imports

import type {PropsWithChildren} from "react";
import styles from './TichuCallResult.module.css';

// endregion

// region local

/**
 * Properties for {@link TichuCallResult}
 */
type TichuCallResultProps = PropsWithChildren<Readonly<{
  /**
   * When true show correct, else show incorrect
   */
  correct: boolean;
}>>;

// endregion

// region exports

/**
 * {@link TichuCallResult} shows the result of a (grand) tichu call
 */
export function TichuCallResult({correct, children,}: TichuCallResultProps) {
  const className = styles['result-container'] + ' ' +
    (correct ? styles['result-container--is-correct'] : styles['result-container--is-wrong'])
  ;
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// endregion
