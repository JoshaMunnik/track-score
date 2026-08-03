/**
 * Checks if className contains some text.
 *
 * @param className
 *
 * @return an empty string or the trimmed className with an additional space added to the end.
 */
export function resolveClassName(className?: string): string {
  const cleanedClassName = className ? className.trim() : '';
  return cleanedClassName.length > 0 ? `${cleanedClassName} ` : '';
}
