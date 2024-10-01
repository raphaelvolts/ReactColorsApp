import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useLocation } from "react-router-dom";
import chroma from "chroma-js";
import "./ColorBox.css";

export default function ColorBox({ background, format, showLink }) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  let colorCode = `${location.pathname}/${background.id}`;
  let linked = new URL(window.origin + `${colorCode}`);
  function changeCopiedState() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  const isDarkColor = chroma(background.hex).luminance() <= 0.08;
  const isLightColor = chroma(background.hex).luminance() >= 0.8;

  return (
    <CopyToClipboard text={background[format]} onCopy={changeCopiedState}>
      <div className="ColorBox" style={{ background: background[format] }}>
        <div
          className={`copy-overlay ${copied && "show"}`}
          style={{ background: background[format] }}
        />
        <div
          className={`copy-msg ${copied && "show"} ${
            isLightColor && "light-background"
          }`}
        >
          <h1>Copied!</h1>
          <p className={isLightColor && "light-background"}>
            {background[format]}
          </p>
        </div>
        <div className="copy-container">
          <div className="box-container">
            <span className={isDarkColor && "dark-background"}>
              {background.name}
            </span>
          </div>
          <button className={`button ${isLightColor && "light-background"}`}>
            Copy
          </button>
        </div>
        {showLink && (
          <Link
            to={
              linked.pathname /* or we can use simple-- `/palette/${paletteId}/${background.id} */
            }
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`see-more ${isLightColor && "light-background"}`}>
              MORE
            </span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
