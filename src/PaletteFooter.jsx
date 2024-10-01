export default function PaletteFooter({ paletteName, emoji }) {
  return (
    <footer className="Palette-footer">
      {paletteName}
      <span className="Palette-footer-emoji">{emoji}</span>
    </footer>
  );
}
