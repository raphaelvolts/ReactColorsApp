import Slider from "rc-slider";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import "rc-slider/assets/index.css";
import "./Navbar.css";

export default function Navbar({
  level,
  handleLevel,
  format,
  handleFormat,
  snackbarStatus,
  handleSnackbar
}) {
  function handleChange(e) {
    handleFormat(e.target.value);
  }
  /* const handleClose = () => {
    handleSnackbar();
  }; */
  return (
    <nav className="Navbar">
      <div className="Navbar-logo">
        <Link to="/">reactcolorpalettes</Link>
      </div>
      {level && (
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
      )}
      <div className="Navbar-select-container">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select value={format} onChange={handleChange} name="format">
            <MenuItem value="hex" name="hex">
              HEX - #ffffff
            </MenuItem>
            <MenuItem value="rgb" name="rgb">
              RGB - rgb(255, 255, 255)
            </MenuItem>
            <MenuItem value="rgba" name="rgba">
              RGBA - RGBA(255, 255, 255, 1.0)
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <Snackbar
        open={snackbarStatus}
        autoHideDuration={3000}
        onClose={handleSnackbar}
        message={`Format changed to ${format.toUpperCase()}`}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </nav>
  );
}
