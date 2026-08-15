// region imports

import styles from './CatanDie.module.css';
import type {PropsWithChildren} from "react";
import {CatanDieColor} from "../type/CatanDieColor.ts";

// endregion

// region local

type CatanDieProps = PropsWithChildren<Readonly<{
  color: CatanDieColor;
}>>;

function colorPart(value: CatanDieColor): string
{
  switch (value) {
    case CatanDieColor.Black:
      return 'black';
    case CatanDieColor.Green:
      return 'green';
    case CatanDieColor.Blue:
      return 'blue';
    case CatanDieColor.Yellow:
      return 'yellow';
  }
}

// endregion

// region exports

export function CatanDie({color = CatanDieColor.Black, children}: Partial<CatanDieProps>) {
  return (
    <div className={styles['catan-die'] + ' ' + styles[`catan-die--is-${colorPart(color)}`]}>
      {children}
    </div>
  );
}

// endregion