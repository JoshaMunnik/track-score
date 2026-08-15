// region imports

import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import styles from './Container.module.css';
import {resolveClassName} from "../styledHelpers.ts";
import type {PropsWithChildren} from "react";
import {Size} from "../../../types/enums/ui/Size.ts";
import {BorderRadius} from "../../../types/enums/ui/BorderRadius.ts";
import {BorderColor} from "../../../types/enums/ui/BorderColor.ts";
import {Color} from "../../../types/enums/ui/Color.ts";

// endregion

// region exports

export type ContainerProps = Readonly<PropsWithChildren<{
  /**
   * Width of the container; default is {@link Size.Auto}
   */
  width: Size;

  /**
   * Height of the container; default is {@link Size.Auto}
   */
  height: Size;

  /**
   * Padding on all sides, if this has the default value of {@link Spacing.None}, the values of
   * {@link horizontalPadding} and {@link verticalPadding} is used instead. Default is
   * {@link Spacing.None}
   */
  padding: Spacing;

  /**
   * Padding in horizontal direction, this value is only used if {@link padding} has the value
   * {@link Spacing.None}. Default is {@link Spacing.None}
   */
  horizontalPadding: Spacing;

  /**
   * Padding in vertical direction, this value is only used if {@link padding} has the value
   * {@link Spacing.None}. Default is {@link Spacing.None}
   */
  verticalPadding: Spacing;

  /**
   * Border radius to apply; default is {@link BorderRadius.None}
   */
  borderRadius: BorderRadius;

  /**
   * Border color to use; default is {@link BorderColor.None}
   */
  borderColor: BorderColor;

  /**
   * Background color to use; default is {@link Color.None}
   */
  backgroundColor: Color;

  /**
   * When `true` show a shadow around the container.
   */
  shadow?: boolean;

  /**
   * When `true` show a shadow at the bottom of the container.
   */
  shadowBottom?: boolean;

  /**
   * When set, add style with flex number
   */
  flex?: number;

  /**
   * One or more additional css classnames to use
   */
  className?: string;
}>>;

// eslint-disable-next-line react-refresh/only-export-components
export const DefaultContainerProps: ContainerProps = {
  width: Size.Auto,
  height: Size.Auto,
  padding: Spacing.None,
  horizontalPadding: Spacing.None,
  verticalPadding: Spacing.None,
  borderRadius: BorderRadius.None,
  borderColor: BorderColor.None,
  backgroundColor: Color.None,
  shadow: false,
  shadowBottom: false,
  className: '',
  children: null,
};

/**
 * A container is a simple wrapper component that applies color, radius, border, width, height
 * and padding styles.
 */
export function Container(props: Partial<ContainerProps>) {
  const {
    width, height, padding, horizontalPadding, verticalPadding, borderColor, borderRadius,
    backgroundColor, className, children, shadow, shadowBottom, flex
  } = {
    ...DefaultContainerProps, ...props
  };
  const horizontal = padding !== Spacing.None ? padding : horizontalPadding;
  const vertical = padding !== Spacing.None ? padding : verticalPadding;
  const classNames: string = resolveClassName(className) +
    styles.container +
    ' ' + styles[`container--has-${width}-width`] +
    ' ' + styles[`container--has-${height}-height`] +
    ' ' + styles[`container--has-${horizontal}-horizontal-padding`] +
    ' ' + styles[`container--has-${vertical}-vertical-padding`] +
    ' ' + styles[`container--has-${backgroundColor}-background`] +
    ' ' + styles[`container--has-${borderRadius}-border-radius`] +
    ' ' + styles[`container--has-${borderColor}-border`] +
    (shadow ? ' ' + styles['container--has-shadow'] : '') +
    (shadowBottom ? ' ' + styles['container--has-bottom-shadow'] : '') +
    '';
  if (flex !== undefined) {
    return (<div style={{flex: flex}} className={classNames}>{children}</div>)
  }
  return (<div className={classNames}>{children}</div>);
}

// endregion
