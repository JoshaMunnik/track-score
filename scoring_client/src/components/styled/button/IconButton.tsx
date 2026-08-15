// region imports

import styles from './Button.module.css';
import {Button, type ButtonProps} from "./Button.tsx";
import {resolveClassName} from "../styledHelpers.ts";

// endregion

// region local

type IconButtonProps = ButtonProps & Readonly<{
  small?: boolean;
}>;

// endregion

// region exports

/**
 * Use {@link IconButton} when the button shows an icon. It uses different padding then the normal
 * button.
 */
export function IconButton(props: Partial<IconButtonProps>) {
  const {className, small = false} = {...props};
  const classNames = resolveClassName(className) +
    styles['button--is-icon'] +
    (small ? ' ' + styles['button--is-small-icon'] : '') +
    '';
  return (
    <Button {...props} className={classNames}/>
  )
}

// endregion