/**
 * How to distribute the children in the direction of the main axis (column or row).
 */
export enum DistributeContent {
  /**
   * Default distribution. For the main axis this is {@link Start}, for the cross axis this is
   * `normal` which preserves the positions.
   */
  Default = 'default',

  /**
   * Place at start
   */
  Start = 'distribute-at-start',

  /**
   * Place at center
   */
  Center = 'distribute-at-center',

  /**
   * Place at end
   */
  End = 'distribute-at-end',

  /**
   * Stretch each child
   */
  Stretch = 'stretch',

  /**
   * Distribute space between children
   */
  SpaceBetween = 'space-between',

  /**
   * Distribute space around children
   */
  SpaceAround = 'space-around',

  /**
   * Distribute space evenly between children and the edge
   */
  SpaceEvenly = 'space-evenly',
}