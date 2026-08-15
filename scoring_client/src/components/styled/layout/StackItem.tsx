import type {PropsWithChildren} from "react";
import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {resolveClassName} from "../styledHelpers.ts";
import styles from './Stack.module.css';

type StackItemProps = PropsWithChildren<{
  alignVertical: AlignItem;
  alignHorizontal: AlignItem;
  className?: string
}>;

/**
 * {@link StackItem} can be used to position an element at a certain position within the stack.
 *
 * Only use this component within a {@link Stack} component.
 */
export function StackItem({
  alignVertical = AlignItem.Center,
  alignHorizontal = AlignItem.Center,
  className,
  children,
}: StackItemProps) {
  const classNames = resolveClassName(className) +
    styles[`stack-item--horizontally-${alignHorizontal}`] +
    ' ' + styles[`stack-item--vertically-${alignVertical}`];
  return (
    <div className={classNames}>{children}</div>
  )
}