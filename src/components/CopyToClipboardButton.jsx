import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import link_logo from "../imgs/link-icon.png";
import check_logo from "../imgs/check-icon.png";

const CopyToClipboardButton = (props) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    setCopied(true);
    // console.log("copied");
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <CopyToClipboard text={props.url}>
      <div
        className={`w-${props.size} h-${props.size} p-[${props.size}px] hover:bg-zinc-200 bg-zinc-100 rounded-[5px] justify-center items-center gap-2.5 inline-flex`}
        onClick={!copied && handleClick}
        style={{ cursor: 'pointer' }}
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
