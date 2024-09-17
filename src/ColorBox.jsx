import "./ColorBox.css";

export default function ColorBox({ background }) {
  return (
    <div className="ColorBox" style={{ background: background.color }}>
      <span>{background.name}</span>
      <span>MORE</span>
    </div>
  );
}
