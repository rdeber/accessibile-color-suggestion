import { blendRgbaOnHex } from "./blendRgbaOnHex";
import { cssColors } from "./cssNamedColors";

export function suggestAccessibleColor(inputColor: string, contrastThreshold: number = 4.5) {
  const normalizeColor = (color: string): string => {
    if (color.startsWith('#')) return color;
    if (/^#[0-9a-f]{3,6}$/i.test(color)) return color;
    return cssColors[color.toLowerCase() as keyof typeof cssColors];
  };

  const background = normalizeColor(inputColor);

  // Helper function to convert RGB to relative luminance
  function getRelativeLuminance(color: number) {
    const sRGB = color / 255.0;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  }

  // Helper function to calculate contrast ratio
  function getContrastRatio(l1: number, l2: number) {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Convert hex color to RGB components
  function hexToRGB(hex: string) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return { r, g, b };
  }

  // Convert input background color to RGB
  const { r: bgR, g: bgG, b: bgB } = hexToRGB(background);

  // Calculate relative luminance for background and both text colors
  const bgLuminance = 0.2126 * getRelativeLuminance(bgR) + 0.7152 * getRelativeLuminance(bgG) + 0.0722 * getRelativeLuminance(bgB);
  const whiteLuminance = getRelativeLuminance(255);
  const blackLuminance = getRelativeLuminance(0);

  // Calculate contrast ratios
  const whiteContrast = getContrastRatio(bgLuminance, whiteLuminance);
  const blackContrast = getContrastRatio(bgLuminance, blackLuminance);

  // Determine which color has a higher contrast ratio
  const suggestedColor = whiteContrast >= blackContrast ? [255, 255, 255] : [0, 0, 0];

  // Start with alpha value of 1.0
  let alpha = 1.0;
  let contrastRatio = Math.max(whiteContrast, blackContrast);
  const suggestedColors = [];

  // Reduce alpha and check contrast ratio
  while (alpha > 0 && contrastRatio >= contrastThreshold) {
    alpha -= 0.01;
    const blendedColor = blendRgbaOnHex(`rgba(${suggestedColor[0]},${suggestedColor[1]},${suggestedColor[2]},${alpha})`, background);
    const { r, g, b } = hexToRGB(blendedColor);
    const blendedLuminance = 0.2126 * getRelativeLuminance(r) + 0.7152 * getRelativeLuminance(g) + 0.0722 * getRelativeLuminance(b);
    contrastRatio = getContrastRatio(bgLuminance, blendedLuminance);
  }

  for (let i = 0; i < 3; i++) {
    alpha += 0.075;
    const color = blendRgbaOnHex(`rgba(${suggestedColor[0]},${suggestedColor[1]},${suggestedColor[2]},${alpha})`, background);
    const { r, g, b } = hexToRGB(color);
    const colorLuminance = 0.2126 * getRelativeLuminance(r) + 0.7152 * getRelativeLuminance(g) + 0.0722 * getRelativeLuminance(b);
    const contrast = getContrastRatio(bgLuminance, colorLuminance);
    if (contrast >= contrastThreshold) {
      suggestedColors.push(color);
    } else {
      break;
    }
  }

  return suggestedColors;
}
