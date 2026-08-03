export enum PageType {
  /**
   * Children get full content and are responsible for padding/margins/etc.
   */
  Plain = 'plain',

  /**
   * Apply default horizontal and vertical padding for the content.
   */
  Padding = 'padding',

  /**
   * Apply default horizontal and vertical padding for the content, and place content inside
   * a {@link Paper}
   */
  Paper = 'paper',
}
