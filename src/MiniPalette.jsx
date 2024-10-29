import { forwardRef } from "react";
import { createUseStyles } from "react-jss";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles/MiniPaletteStyles";

const myStyles = createUseStyles(styles);

const MiniColorDiv = ({ color }) => {
  const classes = myStyles(color);
  return <div className={classes.miniColor}></div>;
};

const MiniPalette = forwardRef(function MiniPalette(
  { palette, navigation, handleDialogOpen },
  ref
) {
  const { paletteName, id, emoji, colors } = palette;
  const classes = myStyles();
  function handleClick() {
    navigation(id);
  }
  function handleOpen(e) {
    e.stopPropagation();
    handleDialogOpen(id, paletteName);
  }

  return (
    <div className={classes.root} ref={ref} onClick={handleClick}>
      <IconButton
        color="inherit"
        aria-label="delete palette"
        onClick={(e) => handleOpen(e)}
        edge="end"
        className={classes.deleteIcon}
        disableRipple
        sx={{
          transition: "all 0.3s ease-in-out",
          borderRadius: 0
        }}
      >
        <DeleteIcon fontSize="medium" color="error" />
      </IconButton>
      <div className={classes.color}>
        {colors.map((color) => (
          <MiniColorDiv color={color.color} key={color.name} />
        ))}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
});
export default MiniPalette;
