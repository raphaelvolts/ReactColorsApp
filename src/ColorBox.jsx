import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ColorBox.css";

export default function ColorBox({ background }) {
  const [copied, setCopied] = useState(false);
  function changeCopiedState() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <CopyToClipboard text={background.hex} onCopy={changeCopiedState}>
      <div className="ColorBox" style={{ background: background.hex }}>
        <div
          className={`copy-overlay ${copied && "show"}`}
          style={{ background: background.hex }}
        />
        <div className={`copy-msg ${copied && "show"}`}>
          <h1>Copied!</h1>
          <p>{background.hex}</p>
        </div>
        <div className="copy-container">
          <div className="box-container">
            <span>{background.name}</span>
          </div>
          <button className="copy-button">Copy</button>
        </div>
        <span className="see-more">MORE</span>
      </div>
    </CopyToClipboard>
  );
}
