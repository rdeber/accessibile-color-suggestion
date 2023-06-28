/**
 * Get contrasting color
 *
 * Calculates the contrast ratio between a given background color and black/white,
 * and returns the RGBA value of the color (black or white) with the higher contrast ratio.
 *
 * @param {string} background - Background color in the format "rgb(r, g, b)" or "rgba(r, g, b, a)"
 * @returns {string} - RGBA value of the contrasting color ("rgba(0, 0, 0, 1)" for black or "rgba(255, 255, 255, 1)" for white)
 */
export const getHigherContrastColor = (background) => {
  // Extract the RGB values from the background color
  const { r, g, b } = extractRGB(background);

  // Calculate the contrast ratios with black and white
  const contrastWithBlack = calculateContrastRatio(r, g, b, 0, 0, 0);
  const contrastWithWhite = calculateContrastRatio(r, g, b, 255, 255, 255);

  // Choose the color with the higher contrast ratio
  const contrastingColor = contrastWithBlack > contrastWithWhite ? [0, 0, 0] : [255, 255, 255];

  // Return the RGBA value of the contrasting color
  return `rgba(${contrastingColor[0]}, ${contrastingColor[1]}, ${contrastingColor[2]}, 1)`;
}

  // Helper function to extract RGB values from a color string
  function extractRGB(color) {
    const rgbValues = color.match(/\d+/g);
    return {
      r: parseInt(rgbValues[0]),
      g: parseInt(rgbValues[1]),
      b: parseInt(rgbValues[2])
    };
  }

  // Helper function to calculate the contrast ratio between two colors
  function calculateContrastRatio(r1, g1, b1, r2, g2, b2) {
    // Calculate the relative luminance for the first color
    const luminance1 = luminance(r1, g1, b1) + 0.05;

    // Calculate the relative luminance for the second color
    const luminance2 = luminance(r2, g2, b2) + 0.05;

    // Calculate the contrast ratio by dividing the maximum luminance by the minimum luminance
    return Math.max(luminance1, luminance2) / Math.min(luminance1, luminance2);
  }

  // Helper function from the previous response to calculate luminance
  function luminance(r, g, b) {
    // Normalize the RGB values and apply the appropriate formulas for linearization
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    // Calculate the relative luminance using weighted sum of the values
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
