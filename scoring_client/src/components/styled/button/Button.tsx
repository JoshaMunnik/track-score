// region imports

import styles from './Button.module.css';
import {resolveClassName} from "../styledHelpers.ts";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";
import {Link} from "react-router";
import type {PropsWithChildren} from "react";
import {Size} from "../../../types/enums/ui/Size.ts";

// endregion

// region local

const DefaultButtonProps: ButtonProps = {
  disabled: false,
  type: ButtonType.Primary,
  width: Size.Auto,
  passive: false,
};

// endregion

// region exports

export type ButtonProps = Readonly<PropsWithChildren<{
  /**
   * When {@link href} is set, the button is rendered as a `<a>` and the {@link onClick} value is
   * ignored. The link is always opened in a new tab.
   */
  href?: string;

  /**
   * When {@link to} is set, the button is rendered as a `<Link>` and the {@link onClick} value
   * is ignored.
   */
  to?: string;

  /**
   * The {@link onClick} property is only used when {@link href} is not set. The button is rendered
   * with the `<button>` tag.
   */
  onClick?: () => void;

  /**
   * The {@link disabled} property is only used when {@link onClick} is set. In all other cases
   * the button is always enabled.
   */
  disabled: boolean;

  /**
   * Which color scheme to use.
   */
  type: ButtonType;

  /**
   * Auto will use width of content with some padding.
   */
  width: Size;

  /**
   * When true, the button is rendered as a static HTML element and can not be enabled
   * or clicked upon. This happens automatically with the following types:
   * {@link ButtonType.Disabled}, {@link ButtonType.Selected}.
   */
  passive: boolean;

  /**
   * Additional CSS classes.
   */
  className?: string;
}>>;

/**
 * When the button is only showing an icon, use {@link IconButton}. This component uses different
 * padding for vertical and horizontal directions.
 *
 * Depending on which property is set, the button is rendered as an anchor, a router link or button.
 */
export function Button(props: Partial<ButtonProps>) {
  const {
    href, to, onClick, disabled, type, width, className, children, passive
  } = {...DefaultButtonProps, ...props};
  const classNames = resolveClassName(className) +
    styles['button'] +
    ' ' + styles[`button--is-${type}`] +
    ' ' + styles[`button--has-${width}-width`]
  ;
  if (passive || (type === ButtonType.Disabled) || (type === ButtonType.Selected)) {
    return (
      <span className={classNames + ' ' + styles['button--is-passive']}>
        {children}
      </span>
    )
  }
  if (href && (href.length > 0)) {
    return (
      <a className={classNames} href={href} target="_blank">
        {children}
      </a>
    )
  }
  if (to && (to.length > 0)) {
    return (
      <Link to={to} className={classNames}>{children}</Link>
    )
  }
  return (
    <button className={classNames} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}