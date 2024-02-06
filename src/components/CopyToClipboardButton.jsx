import React, { useState } from "react";
import link_logo from "../imgs/link_icon.png";
import check_logo from "../imgs/check_icon.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyToClipboardButton = (props) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    console.log("copied");
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <CopyToClipboard text={props.url}>
      <div
        className="w-5 h-5 p-[5px] hover:bg-zinc-200 bg-zinc-100 rounded-[5px] justify-center items-center gap-2.5 inline-flex"
        onClick={!copied && handleClick}
      >
        <img
          className="select-none"
          src={copied ? check_logo : link_logo}
          alt="Copy To Clipboard"
        ></img>
      </div>
    </CopyToClipboard>
  );
};

export default CopyToClipboardButton;
