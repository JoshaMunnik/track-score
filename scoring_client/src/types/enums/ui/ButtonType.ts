export enum ButtonType
{
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',

  /**
   * The button is rendered as text, aligned to the left.
   */
  Text = 'text',

  /**
   * The button is rendered as a static HTML element and can not be enabled. This is different from
   * setting the {@link ButtonProps.disabled} to true.
   */
  Disabled = 'disabled',

  /**
   * The button is rendered as a static HTML element and can not be enabled.
   */
  Selected = 'selected',

  Danger = 'danger',
  Warning = 'warning',
  Success = 'success',
  Section = 'section',

  /**
   * The button uses a transparent background, no center alignment and no padding. The children
   * must take care of this.
   */
  Content = 'content',
}
