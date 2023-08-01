/**
 * Blend rgba on hex color
 *
 * Blends two colors together using alpha compositing.
 * Takes an rgba color value as the first argument
 * and a 6 digit hex color value as the second argument,
 * then returns the blended color in hexadecimal format.
 *
 * @example
 * const hexColor = blendRgbaOnHex('rgba(0, 0, 0, .25)', '#555555');
 * console.log(hexColor);
 *
 * @param foreground The foreground color to blend as an rgba value (ex. rgba(0,0,0,.75))
 * @param background The background color to blend against as a 6 digit hex value (ex. #ffffff)
 *
 * @returns The blended color in hexadecimal format.
 */
export const blendRgbaOnHex = (foreground, background) => {
  // Remove '#' from the beginning of the background color
  const bg = background.replace('#', '');

  // Convert the first two characters to the red value, the second two to green, and the last two to blue
  const [bgR, bgG, bgB] = [bg.substring(0, 2), bg.substring(2, 4), bg.substring(4, 6)].map((n) => parseInt(n, 16));

  // Extract the red, green, blue, and alpha values from the foreground color
  const [fgR, fgG, fgB, fgA = 1] = foreground
    // Remove any white space
    .replace(/\s+/g, '')
    // Match the RGBA/RGB values and capture each value in a group
    .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i)
    // Slice the array to remove the full match and only keep the captured groups
    .slice(1)
    // Map each value to a number or null (if the alpha value is not present)
    .map((n) => (n ? parseFloat(n) : null));

  // Blend the foreground and background colors based on the alpha value of the foreground
  const blendedR = Math.round((1 - fgA) * bgR + fgA * fgR);
  const blendedG = Math.round((1 - fgA) * bgG + fgA * fgG);
  const blendedB = Math.round((1 - fgA) * bgB + fgA * fgB);

  // Convert the blended color to a hexadecimal string and add '#' to the beginning
  const hex = `${blendedR.toString(16).padStart(2, '0')}${blendedG.toString(16).padStart(2, '0')}${blendedB.toString(16).padStart(2, '0')}`;
  const hexColor = `#${hex}`;

  // Return the blended color in hexadecimal format
  return hexColor;
};
