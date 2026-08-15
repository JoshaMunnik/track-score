// region imports

import styles from './Title.module.css';
import type {PropsWithChildren} from "react";
import {Color} from "../../../types/enums/ui/Color.ts";

// endregion

// region local types

type TitleProps = Readonly<PropsWithChildren<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  color?: Color;
}>>;

// endregion

// region exports

export function Title({level = 1, color = Color.Default, children}: Partial<TitleProps>) {
  const classNames = styles['title'] +
    ' ' + styles['title-heading-' + level] +
    (color ? ' ' + styles[`title-color-${color}`] : '') +
    '';
  switch (level) {
    case 1:
      return (<h1 className={classNames}>{children}</h1>);
    case 2:
      return (<h2 className={classNames}>{children}</h2>);
    case 3:
      return (<h3 className={classNames}>{children}</h3>);
    case 4:
      return (<h4 className={classNames}>{children}</h4>);
    case 5:
      return (<h5 className={classNames}>{children}</h5>);
    case 6:
      return (<h6 className={classNames}>{children}</h6>);
  }
}

// endregion