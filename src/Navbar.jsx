import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default function Navbar({ level, handleLevel }) {
  return (
    <nav className="Navbar">
      <div className="Navbar-logo">
        <a href="#">reactcolorpalettes</a>
      </div>
      <div className="Navbar-slider-container">
        <span>Level: {level}</span>
        <div className="Navbar-slider">
          <Slider
            defaultValue={level}
            value={level}
            min={100}
            max={900}
            step={100}
            onChange={handleLevel}
          />
        </div>
      </div>
    </nav>
  );
}
