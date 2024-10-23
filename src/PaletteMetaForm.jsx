import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function PaletteMetaForm({ palettes, handlePalette }) {
  const [open, setOpen] = useState("");

  const handleClickOpen = () => {
    setOpen("form");
  };

  const handleClose = () => {
    setOpen("");
    setNewPalette((op) => ({ ...op, paletteName: "" }));
  };
  const handleDialogs = () => {
    setOpen("emoji");
  };
  const [newPalette, setNewPalette] = useState({
    paletteName: "",
    isError: false,
    error: { isEmpty: false, notUnique: false }
  });

  function handleForm(e) {
    setNewPalette((op) => ({ ...op, paletteName: e.target.value }));
    if (e.target.validity.valid) {
      if (!checkUnique(e.target.value)) {
        handleNotUniqueName();
      } else {
        setNewPalette((op) => ({
          ...op,
          isColorError: false,
          error: { ...op.error, notUniqueColorName: false }
        }));
      }
    } else handleNoName();
  }
  function handleNoName() {
    setNewPalette((op) => ({
      ...op,
      isError: true,
      error: { ...op.error, isEmpty: true }
    }));
  }
  function checkUnique(value) {
    return palettes.every(
      ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    );
  }
  function handleNotUniqueName() {
    setNewPalette((op) => ({
      ...op,
      isError: true,
      error: { ...op.error, notUnique: true }
    }));
  }
  function handleSubmit(emoji) {
    handlePalette(newPalette.paletteName, emoji.native);
  }

  const errorMsgs = {
    isEmpty: "Palette Name is required",
    notUnique: "Palette Name needs to be unique"
  };
  let helperText = "";
  if (newPalette.isError) {
    for (let key in newPalette.error) {
      if (newPalette.error[key]) {
        helperText = errorMsgs[key];
      }
    }
  }

  return (
    <>
      <Dialog open={open === "emoji"} onClose={handleClose}>
        <DialogTitle>Choose your Palette Emoji</DialogTitle>
        <Picker data={data} onEmojiSelect={(emoji) => handleSubmit(emoji)} />
      </Dialog>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Save Palette
      </Button>
      <Dialog
        open={open === "form"}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            if (newPalette.paletteName !== "") {
              handleDialogs();
            } else handleNoName();
          }
        }}
      >
        <DialogTitle>Name your Palette</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new Palette. Please make sure it is
            unique!
          </DialogContentText>

          <TextField
            variant="standard"
            placeholder="Palette Name"
            fullWidth
            margin="normal"
            value={newPalette.paletteName}
            onChange={handleForm}
            error={newPalette.isError}
            helperText={helperText}
            name="paletteName"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit" color="primary">
            Save Palette
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
