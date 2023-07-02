export const hexToRGB = (hex: string) => {
  let color = hex;
  let [r, g, b] = [0, 0, 0];

  if (hex.startsWith('#')) {
    color = hex.replace('#', '');
  }

  if (hex.length === 3) {
    r = parseInt(color[0], 16);
    g = parseInt(color[1], 16);
    b = parseInt(color[2], 16);
  } else {
    r = parseInt(color[0] + color[1], 16);
    g = parseInt(color[2] + color[3], 16);
    b = parseInt(color[4] + color[5], 16);
  }

  return `${r},${g},${b}`;
};
