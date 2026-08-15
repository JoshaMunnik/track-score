import {AlignItem} from "../../../types/enums/ui/AlignItem.ts";
import {DistributeContent} from "../../../types/enums/ui/DistributeContent.ts";
import {Spacing} from "../../../types/enums/ui/Spacing.ts";
import {resolveClassName} from "../styledHelpers.ts";
import style from "./Flex.module.css";
import {type ContainerProps, DefaultContainerProps} from "./Container.tsx";

/**
 * This type is shared between different containers implementing the flexbox.
 */
export type FlexProps = ContainerProps & Readonly<{
  /**
   * How to align the items on the cross axis.
   */
  alignCrossAxis: AlignItem;

  /**
   * How to distribute the items on the main axis.
   */
  distributeMainAxis: DistributeContent;

  /**
   * How to distribute the items on the cross axis. This is only used if {@link wrap} is
   * `true`.
   */
  distributeCrossAxis: DistributeContent;

  /**
   * Whether to reverse the order of the items.
   */
  reverse: boolean;

  /**
   * When `true` wrap the items if they don't fit within the available space on the main axis.
   */
  wrap: boolean;

  /**
   * Spacing between elements.
   */
  gap: Spacing;
}>;

export const DefaultFlexProps: FlexProps = {
  ...DefaultContainerProps,
  alignCrossAxis: AlignItem.Start,
  distributeMainAxis: DistributeContent.Default,
  distributeCrossAxis: DistributeContent.Default,
  reverse: false,
  wrap: false,
  gap: Spacing.None,
};

export function flexClassNames(direction: 'row' | 'column', props: Partial<FlexProps>): string {
  const {alignCrossAxis, distributeMainAxis, distributeCrossAxis, reverse, wrap, gap, className} =
    {...DefaultFlexProps, ...props};
  return resolveClassName(className) +
    style.flex +
    ' ' + (reverse ? style[`flex--is-reversed-${direction}`] : style[`flex--is-${direction}`]) +
    (wrap ? ' ' + style['flex--has-wrapping'] : '') +
    ' ' + style[`flex--has-${gap}-gap`] +
    ' ' + style[`flex--${alignCrossAxis}`] +
    ' ' + style[`flex--${distributeMainAxis}-at-main-axis`] +
    (wrap ? ' ' + style[`flex--${distributeCrossAxis}-at-cross-axis`] : '');
}