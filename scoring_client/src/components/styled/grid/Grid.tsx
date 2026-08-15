import type {PropsWithChildren} from "react";
import styles from './Grid.module.css';

type GridProps = PropsWithChildren<Readonly<{
  /**
   * When true, show a border with rounded corners.
   */
  border?: boolean;

  /**
   * When true show text at 80% size
   */
  smallFont?: boolean;

  /**
   * Columns template (see https://css-tricks.com/complete-guide-css-grid-layout/#prop-grid-template-columns-rows)
   */
  templateColumns: string;

  /**
   * When true, use same minimal height for each row.
   */
  form?: boolean;

  /**
   * When true, use light background
   */
  light?: boolean;
}>>;

/**
 * A general grid, with dynamic number of rows. Each item in the grid should be encapsulated by a
 * {@link GridItem} component. When creating a form, use the {@link GridLabelItem} and
 * {@link GridInputItem} components to align the content properly.
 *
 * Unlike the other styled components, a css value must be provided for the columns' template.
 */
export function Grid({
  border = false,
  templateColumns,
  smallFont = false,
  form = false,
  light = false,
  children,
}: GridProps) {
  const classNames = styles['grid'] +
    (border ? ' ' + styles['grid--has-border'] : '') +
    (smallFont ? ' ' + styles['grid--use-small-font'] : '') +
    (form ? ' ' + styles['grid--is-form'] : '') +
    (light ? ' ' + styles['grid--has-light-background'] : '');
  return (
    <div className={classNames} style={{gridTemplateColumns: templateColumns}}>
      {children}
    </div>
  );
}