/**
 * How to align the children in the opposite direction of the main axis (column or row).
 */
export enum AlignItem
{
  /**
   * Align children at the start of the container.
   */
  Start = 'align-at-start',

  /**
   * Align children at the center of the container.
   */
  Center = 'align-at-center',

  /**
   * Align children at the end of the container.
   */
  End = 'align-at-end',

  /**
   * Stretch children to fill the container.
   */
  Stretch = 'stretch',

  /**
   * Align children at the baseline of the container.
   */
  Base = 'align-at-baseline',
}
