const textColor = (hexColor) => {
  // Remove the '#' character from the hex color value
  const color = hexColor.replace("#", "");

  // Calculate the brightness of the color using the formula (Red value * 299 + Green value * 587 + Blue value * 114) / 1000
  const brightness =
    (parseInt(color.substring(0, 2), 16) * 299 +
      parseInt(color.substring(2, 4), 16) * 587 +
      parseInt(color.substring(4, 6), 16) * 114) /
    1000;

  // Choose white or black text depending on the brightness of the color
  return brightness > 128 ? "black" : "white";
};

const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

const rgbToHex = ([r, g, b]) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

module.exports = {
    textColor,
    rgbToHex
}