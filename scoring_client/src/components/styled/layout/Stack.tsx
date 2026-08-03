import {resolveClassName} from "../styledHelpers.ts";
import styles from "./Stack.module.css";
import {Container, type ContainerProps} from "./Container.tsx";
import {Size} from "../../../types/enums/ui/Size.ts";

/**
 * {@link Stack} places all its children on top of each other within the available space.
 *
 * Use {@link StackItem} to position a child within the available space.
 *
 * By default, a stack uses the full width and height of the parent it is placed in.
 */
export function Stack(props: Partial<ContainerProps>) {
  const classNames = resolveClassName(props.className) + styles['stack'];
  return (
    <Container width={Size.Full} height={Size.Full} {...props} className={classNames} />
  );
}