export function suggestAccessibleColor(background: string) {
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
  return whiteContrast >= blackContrast ? "white" : "black";
}