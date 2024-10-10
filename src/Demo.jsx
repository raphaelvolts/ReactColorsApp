import { useState } from "react";

import { hsvaToHex } from "@uiw/color-convert";

import Chrome from "@uiw/react-color-chrome";

function Demo() {
  const [hsva, setHsva] = useState("#34ef33");
  const hex = hsvaToHex(hsva);
  function handleColor(newColor) {
    console.log(newColor.hex);
    setHsva(newColor.hsva);
  }
  return (
    <>
      <Chrome
        color={hsva}
        style={{ float: "left" }}
        placement={false}
        onChange={(color) => {
          setHsva(color.hsva);
        }}
      />
      <Chrome
        color={hsva}
        style={{
          float: "left"
        }}
        /* inputType="hexa"
          showAlpha={true} */
        placement={false}
        onChange={handleColor}
      />

      <Chrome
        color={hsva}
        placement={false}
        onChange={(color) => {
          setHsva(color.hsva);
        }}
      />
      <Chrome
        color={hsva}
        style={{ marginTop: 10, width: 140 }}
        placement={false}
        showEyeDropper={false}
        showColorPreview={false}
        showEditableInput={false}
        onChange={(color) => {
          setHsva(color.hsva);
        }}
      />
      <div style={{ background: hex, marginTop: 30, padding: 10 }}>{hex}</div>
    </>
  );
}
export default Demo;
