// region imports

import styles from './NormalText.module.css';
import type {PropsWithChildren} from "react";
import {resolveClassName} from "../styledHelpers.ts";
import {Color} from "../../../types/enums/ui/Color.ts";

// endregion

// region local types

export type NormalTextProps = Readonly<PropsWithChildren<{
  className?: string;
  color?: Color;
  hidden?: boolean;
  right?: boolean;
  center?: boolean;
}>>;

// endregion

// region exports

export function NormalText({children, className, hidden, color = Color.Default, right, center}: NormalTextProps) {
  if (hidden) {
    return null;
  }
  const classNames = resolveClassName(className) +
    styles['text'] +
    ' ' + styles[`text--is-${color}`] +
    (right ? ` ${styles['text--is-right']}` : '') +
    (center ? ` ${styles['text--is-center']}` : '');
  return (<p className={classNames}>{children}</p>);
}

// endregion