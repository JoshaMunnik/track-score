// region imports

import styles from './Table.module.css';
import {type PropsWithChildren} from "react";
import {resolveClassName} from "../styledHelpers.ts";

// endregion

// region local

type TableHeaderRowProps = Readonly<PropsWithChildren<{
  className?: string;
}>>;

// endregion

// region exports

export function TableHeaderRow({children, className}: TableHeaderRowProps) {
  return (
    <tr className={resolveClassName(className) + styles['table-header-row']}>
      {children}
    </tr>
  )
}

// endregion