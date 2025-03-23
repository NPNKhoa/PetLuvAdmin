const generatePastelColors = (count) => {
  const colors = [];
  const saturation = 70; // Keep pastel-like
  const lightness = 80; // Keep light

  for (let i = 0; i < count; i++) {
    const hue = (360 / count) * i + Math.random() * 30; // Spread hues evenly
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
};

export default generatePastelColors;
