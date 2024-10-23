import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { Chrome } from "@uiw/react-color";
import chroma from "chroma-js";
import { hexToHsva, hsvaToHex, hsvaToHexa } from "@uiw/color-convert";
import { createUseStyles } from "react-jss";
import styles from "./styles/ColorPickerFormStyles";

const styling = createUseStyles(styles);

export default function ColorPickerForm({
  isPaletteFull,
  addNewColor,
  colors
}) {
  const [chromeColor, setChromeColor] = useState({
    currentColor: "#123488",
    colorName: "",
    isError: false,
    error: {
      isEmpty: false,
      notUniqueColorName: false,
      notUniqueColor: false
    }
  });

  const classes = styling();

  const pickedColor =
    typeof chromeColor.currentColor !== "object"
      ? chromeColor.currentColor
      : hsvaToHex(chromeColor.currentColor);

  const errorMsgs = {
    isEmpty: "Name is required",
    notUniqueColorName: "Color Name needs to be unique",
    notUniqueColor: "Color needs to be unique"
  };

  let helperText = "";
  if (chromeColor.isError) {
    for (let key in chromeColor.error) {
      if (chromeColor.error[key]) {
        helperText = errorMsgs[key];
      }
    }
  }

  function handleColor(newColor) {
    setChromeColor((cc) => ({
      ...cc,
      currentColor: newColor.hsva
    }));
    if (!checkUniqueColor()) handleNotUniqueColor();
    else
      setChromeColor((cc) => ({
        ...cc,
        isError: false,
        error: { ...cc.error, notUniqueColor: false }
      }));
  }

  function checkUnique(value) {
    return colors.every(
      ({ name }) => name.toLowerCase() !== value.toLowerCase()
    );
  }

  function checkUniqueColor() {
    let isColorUnique = true;
    isColorUnique = colors.every(
      (color) =>
        color.color.toLowerCase() !== hsvaToHex(chromeColor.currentColor)
    );

    return isColorUnique;
  }

  function handleNoName() {
    setChromeColor((oc) => ({
      ...oc,
      isError: true,
      error: { ...oc.error, isEmpty: true }
    }));
  }

  function handleNotUniqueName() {
    setChromeColor((oc) => ({
      ...oc,
      isError: true,
      error: { ...oc.error, notUniqueColorName: true }
    }));
  }

  function handleNotUniqueColor() {
    setChromeColor((oc) => ({
      ...oc,
      isError: true,
      error: { ...oc.error, notUniqueColor: true }
    }));
  }

  function handleForm(e) {
    setChromeColor((oc) => ({ ...oc, colorName: e.target.value }));
    if (e.target.validity.valid) {
      if (!checkUnique(e.target.value)) {
        handleNotUniqueName();
      } else {
        setChromeColor((oc) => ({
          ...oc,
          isError: false,
          error: { ...oc.error, notUniqueColorName: false }
        }));
      }
    } else handleNoName();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (checkUniqueColor()) {
      if (chromeColor.colorName !== "") {
        const newColor = {
          color: pickedColor,
          name: chromeColor.colorName
        };
        setChromeColor((occ) => ({ ...occ, colorName: "" }));
        addNewColor(newColor);
      } else handleNoName();
    } else handleNotUniqueColor();
  }

  return (
    <>
      <Chrome
        color={chromeColor.currentColor}
        style={{
          float: "left"
        }}
        className={classes.picker}
        inputType="hexa"
        placement={false}
        onChange={(color) => handleColor(color)}
      />
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          value={chromeColor.colorName}
          onChange={handleForm}
          name="colorName"
          required
          error={chromeColor.isError}
          helperText={helperText}
          variant="filled"
          className={classes.colorNameInput}
          label="Color Name"
        />
        <Button
          className={classes.addButton}
          variant="contained"
          type="submit"
          color="primary"
          disabled={isPaletteFull}
          sx={{
            backgroundColor: isPaletteFull ? "grey" : pickedColor,
            color: isPaletteFull
              ? "rgba(0,0,0,0.6)"
              : chroma(pickedColor).luminance() >= 0.8
              ? "rgba(0,0,0,0.6)"
              : "#fff"
          }}
        >
          {isPaletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </Box>
    </>
  );
}
