import React, { useContext } from "react";
import axios from "axios";
import delete_logo from "../imgs/delete.png";
import { Link } from "react-router-dom";
import CopyToClipboardButton from "./CopyToClipboardButton";
import DBContext from "../DBContext";
import LinkController from "../controller/LinkController";

const LinkItem = (props) => {
  const dbProm = useContext(DBContext).dbProm;

  function handleClick() {
    dbProm.then((db) => {
      const linkController = new LinkController(db);
      linkController.delete(props.id).then(() => {
        console.log("deleted");
        props.setLinks((prev) => {
          return prev.filter((link, i) => link.id !== props.id);
        });
      });
    })
    
  }

  return (
    <div className="w-[290px] h-[35px] justify-start items-start inline-flex">
      <div className="w-[290px] self-stretch pl-[40px] justify-start items-center gap-2.5 flex">
        <div className="h-[31px] bg-white justify-start items-center gap-[15px] flex">
            <div className="w-[180px] h-[30px] pr-[11px] flex-col justify-center items-start inline-flex">
                <div className="text-neutral-600 text-xs font-bold font-['Jost']">{props.name}</div>
                <div className="text-neutral-600 text-[10px] font-medium font-['Jost']"><Link to={props.url}>{props.url}</Link></div>
            </div>
        </div>
        <div className="w-[47px] h-[30px] flex justify-center content-center space-x-2">
            <CopyToClipboardButton url={props.url}/>
            <div className="w-5 h-5 p-[5px] bg-zinc-100 rounded-[5px] justify-center items-center gap-2.5 inline-flex" onClick={handleClick}>
                <img src={delete_logo} alt="delete url"></img>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
