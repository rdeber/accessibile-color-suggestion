/**
 * Calculate relative luminance
 *
 * Determines the relative luminance value of a color based on
 * the WCAG 2 specification: https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *
 * @param {type} r Value between 0 and 255
 * @param {type} g Value between 0 and 255
 * @param {type} b Value between 0 and 255
 * @return {number} Value between 0 and 1
 *
 */
export const getRelativeLuminance = (r, g, b) => {
  let a = [r, g, b].map((v) => {
    v /= 255;
    // Apply linearization formula if the value is less than or equal to the threshold
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance using weighted sum of the values
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
