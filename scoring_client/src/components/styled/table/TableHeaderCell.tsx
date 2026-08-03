// region imports

import styles from './Table.module.css';
import {type PropsWithChildren} from "react";
import {resolveClassName} from "../styledHelpers.ts";

// endregion

// region local

type TableHeaderCellProps = Readonly<PropsWithChildren<{
  className?: string;
  fullWidth?: boolean;
}>>;

// endregion

// region exports

export function TableHeaderCell({children, className, fullWidth = false}: TableHeaderCellProps) {
  const classNames = resolveClassName(className) + styles['table-header-cell'] +
    (fullWidth ? ' ' + styles['table-header-cell--is-full-width'] : '');
  return (
    <th className={classNames}>
      {children}
    </th>
  );
}

// endregion