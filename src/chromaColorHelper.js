import chroma, { hex } from "chroma-js";

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export default function generatePalette(starterPalette) {
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {}
  };
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  for (let color of starterPalette.colors) {
    let scale = generateColors(color.color, 10).reverse();
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css().replace(/ /g, ", "),
        rgba: chroma(scale[i])
          .css()
          .replace(/ /g, ", ")
          .replace("rgb", "rgba")
          .replace(")", ", 1.0)")
      });
    }
  }
  return newPalette;
}

function getRange(hexColor) {
  const end = "#fff";
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

function generateColors(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}
