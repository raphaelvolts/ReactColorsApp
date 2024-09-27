import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useLocation } from "react-router-dom";
import "./ColorBox.css";

export default function ColorBox({ background, format, paletteId }) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  let colorCode = `${location.pathname}/${background.id}`;
  let linked = new URL(window.origin + `${colorCode}`);
  console.log(linked);
  function changeCopiedState() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <CopyToClipboard text={background[format]} onCopy={changeCopiedState}>
      <div className="ColorBox" style={{ background: background[format] }}>
        <div
          className={`copy-overlay ${copied && "show"}`}
          style={{ background: background[format] }}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>Copied!</h1>
          <p>{background[format]}</p>
        </div>
        <div className="copy-container">
          <div className="box-container">
            <span>{background.name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <Link
          to={
            linked.pathname /* or we can use simple-- `/palette/${paletteId}/${background.id} */
          }
          onClick={(e) => e.stopPropagation()}
        >
          <span className="see-more">MORE</span>
        </Link>
      </div>
    </CopyToClipboard>
  );
}
