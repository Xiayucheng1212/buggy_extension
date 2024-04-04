import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import delete_logo from "../imgs/delete.png";
import CopyToClipboardButton from "./CopyToClipboardButton";
import AppContext from "../AppContext";
import LinkController from "../controller/LinkController";

const LinkItem = (props) => {
  const dbProm = useContext(AppContext).dbProm;
  const buttonSize = 6;

  function handleClickUrl() {
    chrome.tabs.create({ url: props.url });
  }

  function handleDelete() {
    dbProm.then((db) => {
      const linkController = new LinkController(db);
      linkController.delete(props.id).then(async (newAllTags) => {
        props.setLinks((prev) => {
           return prev.filter((link, i) => link.id !== props.id);
        });
        for(let tag of newAllTags) {
          // populate links in the tag
          let links = await linkController.getLinks(tag.links);
          tag.links = links;
        }
        console.log(newAllTags);
        props.setTags(newAllTags);
      });
    })
  }

  return (
    <div className="self-stretch h-[35px] justify-start items-start inline-flex">
      <div className="w-full pl-[25px] pr-[15px] justify-between items-center gap-2.5 flex">
        <div className="h-[30px] bg-white justify-start items-center gap-[15px] flex">
          <div className="w-[180px] h-[30px] pr-[11px] flex-col justify-center items-start inline-flex" onClick={handleClickUrl} style={{cursor: 'pointer'}}>
            <div className="text-neutral-600 text-xs font-bold font-['Jost']">{props.name}</div>
            <div className="overflow-x-auto text-neutral-600 text-[10px] font-medium font-['Jost']" style={{maxHeight: '50px'}}>{props.url}</div>
          </div>
        </div>
        <div className="flex justify-between item-center space-x-2">
          <CopyToClipboardButton url={props.url} size={buttonSize}/>
          <div className={`w-${buttonSize} h-${buttonSize} p-[${buttonSize}px] hover:bg-zinc-200 bg-zinc-100 rounded-[5px] justify-center items-center gap-2.5 inline-flex`} style={{cursor: 'pointer'}} onClick={handleDelete}>
            <img src={delete_logo} alt="delete url"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkItem;
