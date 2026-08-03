// region imports

import styles from './Table.module.css';
import {type PropsWithChildren} from "react";
import {resolveClassName} from "../styledHelpers.ts";

// endregion

// region local

type TableDataCellProps = Readonly<PropsWithChildren<{
  right?: boolean;
  center? : boolean;
  bottom?: boolean;
  className?: string;
}>>;

// endregion

// region exports

export function TableDataCell({
  right = false, center = false, bottom = false, children, className
}: TableDataCellProps) {
  const classNames = resolveClassName(className) +
    styles['table-data-cell'] +
    (right ? ' ' + styles['table-data-cell--align-right'] : '') +
    (center ? ' ' + styles['table-data-cell--align-center'] : '') +
    (bottom ? ' ' + styles['table-data-cell--align-bottom'] : '');
  return (
    <th className={classNames}>
      {children}
    </th>
  );
}

// endregion