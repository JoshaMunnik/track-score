// region imports

import type {PropsWithChildren} from "react";
import {Size} from "../../../types/enums/ui/Size.ts";
import styles from './Grid.module.css';
import type {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {alignToDistribute} from "../../../tools/uiTools.ts";
import {Column} from "../layout/Column.tsx";
import type {Spacing} from "../../../types/enums/ui/Spacing.ts";
import type {Color} from "../../../types/enums/ui/Color.ts";

// endregion

// region exports

export type GridItemProps = PropsWithChildren<Readonly<{
  /**
   * When set, this will override the horizontal and vertical padding values.
   */
  padding?: Spacing;

  /**
   * Will only be used if {@link padding} is not set.
   */
  horizontalPadding?: Spacing;

  /**
   * Will only be used if {@link padding} is not set.
   */
  verticalPadding?: Spacing;

  /**
   * Borders at each side
   */
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;

  /**
   * Number of columns this item spawns (default is a single column)
   */
  span?: number;

  /**
   * Optional click handler.
   */
  onClick?: () => void;

  /**
   * How to align the content within the grid.
   */
  horizontalAlign?: AlignItem;

  /**
   * How to align the content within the grid.
   */
  verticalAlign?: AlignItem;

  /**
   * When `true` do not render the grid item.
   */
  hidden?: boolean;

  /**
   * When true, use an alternate background color. This is only used if {@link color} is not set or
   * it is set {@link Color.Default}.
   */
  alternate?: boolean;

  /**
   * When true, use a winner background color. This is only used if {@link color} is not set or
   * it is set {@link Color.Default}.
   */
  winner?: boolean;

  /**
   * When set, use a background color. Except the {@link Color.Default} this will override the
   * {@link alternate} and {@link winner} settings.
   */
  color?: Color;
}>>;

/**
 * Use this component with a {@link Grid} container. If content is aligned, the content will be
 * wrapped with a flex column container; so that borders still cover the whole area.
 */
export function GridItem({
  padding,
  horizontalPadding,
  verticalPadding,
  borderTop = false,
  borderBottom = false,
  borderLeft = false,
  borderRight = false,
  span = 1,
  alternate = false,
  winner = false,
  onClick,
  horizontalAlign,
  verticalAlign,
  hidden = false,
  color,
  children,
}: GridItemProps) {
  if (hidden) {
    return null;
  }

  if (padding !== undefined) {
    horizontalPadding = padding;
    verticalPadding = padding;
  }

  function getContent() {
    if ((horizontalAlign === undefined) && (verticalAlign === undefined)) {
      return children;
    }
    return (
      <Column
        width={Size.Full}
        height={Size.Full}
        alignCrossAxis={horizontalAlign}
        distributeMainAxis={alignToDistribute(verticalAlign)}
      >
        {children}
      </Column>
    )
  }

  const className = styles['grid-item'] +
    (horizontalPadding ? ` ${styles[`grid-item--has-${horizontalPadding}-horizontal-padding`]}` : '') +
    (verticalPadding ? ` ${styles[`grid-item--has-${verticalPadding}-vertical-padding`]}` : '') +
    (borderTop ? ` ${styles['grid-item--has-top-border']}` : '') +
    (borderBottom ? ` ${styles['grid-item--has-bottom-border']}` : '') +
    (borderLeft ? ` ${styles['grid-item--has-left-border']}` : '') +
    (borderRight ? ` ${styles['grid-item--has-right-border']}` : '') +
    (span > 1 ? ` ${styles[`grid-item--has-${span}-span`]}` : '') +
    (alternate ? ` ${styles['grid-item--has-alternate-background']}` : '') +
    (winner ? ` ${styles['grid-item--has-winner-background']}` : '') +
    (color ? ` ${styles[`grid-item--has-${color}-background`]}` : '')
    + '';
  return (
    <div className={className} onClick={onClick}>
      {getContent()}
    </div>
  );
}

// endregion