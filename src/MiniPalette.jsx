import { useState } from "react";
import { createUseStyles } from "react-jss";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./styles/MiniPaletteStyles";
import { DialogActions } from "@mui/material";

const myStyles = createUseStyles(styles);

const MiniColorDiv = ({ color }) => {
  const classes = myStyles(color);
  return <div className={classes.miniColor}></div>;
};

export default function MiniPalette({ palette, navigation, removePalette }) {
  const [open, setOpen] = useState(false);
  const { paletteName, id, emoji, colors } = palette;
  const classes = myStyles();
  function handleClick() {
    navigation(id);
  }
  function handleOpen(e) {
    e.stopPropagation();
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleDelete(e) {
    e.stopPropagation();
    removePalette(id);
  }
  return (
    <div className={classes.root} onClick={handleClick}>
      <IconButton
        color="inherit"
        aria-label="delete palette"
        onMouseDown={handleOpen}
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
      <Dialog open={open} onClose={handleClose} sx={{ alignItems: "start" }}>
        <DialogTitle>Do you want to Delete this Palette?</DialogTitle>
        <DialogActions>
          <Button
            color="error"
            startIcon={<DeleteForeverIcon />}
            onMouseDown={handleDelete}
          >
            Confirm Delete?
          </Button>
          <Button startIcon={<CloseIcon />} onMouseDown={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
}
