// region imports

import styles from './Table.module.css';
import {type PropsWithChildren} from "react";
import * as React from "react";
import {TableHeaderRow} from "./TableHeaderRow.tsx";
import {TableDataRow} from "./TableDataRow.tsx";
import {resolveClassName} from "../styledHelpers.ts";

// endregion

// region local

type TableProps = Readonly<PropsWithChildren<{
  className?: string;
  fullWidth?: boolean;
}>>;

// endregion

// region exports

/**
 * Assumes the children are either instances of {@link TableHeaderRow} or {@link TableDataRow}.
 * Children using other types are ignored.
 */
export function Table({children, className, fullWidth = false}: TableProps) {
  const headerRows: React.ReactNode[] = [];
  const dataRows: React.ReactNode[] = [];
  // sort children (so they can be wrapped with the correct container tag)
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
  if (child.type === TableHeaderRow) {
      headerRows.push(child);
    } else if (child.type === TableDataRow) {
      dataRows.push(child);
    }
  });
  const classNames = resolveClassName(className) + styles['table'] +
    (fullWidth ? ' ' + styles['table--is-full-width'] : '');
  return (
    <table className={classNames}>
      {(headerRows.length > 0) && <thead>{headerRows}</thead>}
      {(dataRows.length > 0) && <tbody>{dataRows}</tbody>}
    </table>
  );
}

// endregion