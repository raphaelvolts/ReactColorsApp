import Slider from "rc-slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default function Navbar({ level, handleLevel, format, handleFormat }) {
  function handleChange(e) {
    handleFormat(e.target.value);
  }
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
      <div className="Navbar-select-container">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select value={format} onChange={handleChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - RGBA(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </FormControl>
      </div>
    </nav>
  );
}
