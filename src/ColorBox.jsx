import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useLocation } from "react-router-dom";
import { createUseStyles } from "react-jss";
import styles from "./styles/ColorBoxStyles";

const colorBoxStyles = createUseStyles(styles);

export default function ColorBox({ background, format, showLink }) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  let colorCode = `${location.pathname}/${background.id}`;
  let linked = new URL(window.origin + `${colorCode}`);
  function changeCopiedState() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  const classes = colorBoxStyles({ background, format, showLink });

  return (
    <CopyToClipboard text={background[format]} onCopy={changeCopiedState}>
      <div
        className={classes.ColorBox}
        style={{ background: background[format] }}
      >
        <div
          className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
          style={{ background: background[format] }}
        />
        <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
          <h1>Copied!</h1>
          <p className={classes.copyText}>{background[format]}</p>
        </div>
        <div className="copy-container">
          <div className={classes.boxContainer}>
            <span className={classes.colorName}>{background.name}</span>
          </div>
          <button className={classes.button}>Copy</button>
        </div>
        {showLink && (
          <Link
            to={
              linked.pathname /* or we can use simple-- `/palette/${paletteId}/${background.id} */
            }
            onClick={(e) => e.stopPropagation()}
          >
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
}
