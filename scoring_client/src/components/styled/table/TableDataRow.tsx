// region imports

import styles from './Table.module.css';
import {type PropsWithChildren} from "react";
import {resolveClassName} from "../styledHelpers.ts";

// endregion

// region local

type TableDataRowProps = Readonly<PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>>;

// endregion

// region exports

export function TableDataRow({children, className, onClick}: TableDataRowProps) {
  return (
    <tr
      className={resolveClassName(className) + styles['table-data-row']}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

// endregion
