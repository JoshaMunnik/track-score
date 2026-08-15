// region imports

import styles from './NormalText.module.css';
import {resolveClassName} from "../styledHelpers.ts";
import {Color} from "../../../types/enums/ui/Color.ts";
import type {NormalTextProps} from "./NormalText.tsx";

// endregion

// region exports

export function SpanText({children, className, hidden, color = Color.Default}: NormalTextProps) {
  if (hidden) {
    return null;
  }
  const classNames = resolveClassName(className) +
    styles[`text--is-${color}`];
  return (<span className={classNames}>{children}</span>);
}

// endregion