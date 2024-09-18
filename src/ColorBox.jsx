import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ColorBox.css";

export default function ColorBox({ background }) {
  return (
    <CopyToClipboard text={background.color}>
      <div className="ColorBox" style={{ background: background.color }}>
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
