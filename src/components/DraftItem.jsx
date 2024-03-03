import React from 'react';
import up_logo from '../imgs/up-arrow.png';
import delete_logo from '../imgs/delete.png';
import CopyToClipboardButton from './CopyToClipboardButton';
import { Link } from 'react-router-dom';

const DraftItem = (props) => {
    // TODO: add delete functionality

    return (
        <div className="w-full h-[35px] pl-1.5 justify-start items-center inline-flex">
            <div className="w-[200px] h-[30px] pr-[10px] flex-col justify-center items-start inline-flex">
                <div className="text-neutral-600 text-xs font-bold font-['Jost']">{props.name}</div>
                <div className="text-neutral-600 text-[10px] font-medium font-['Jost'] overflow-x-auto whitespace-nowrap">{props.url}</div>
            </div>
            <div className="w-[80px] h-[30px] flex justify-center items-center space-x-2">
                <CopyToClipboardButton url={props.url} />
                <div className="w-6 h-6 p-[6px] hover:bg-zinc-200 bg-zinc-100 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                    <Link to={`/edit/${props.id}`}><img src={up_logo} alt='upload url' /></Link>
                </div>
                <div className="w-6 h-6 p-[6px] hover:bg-zinc-200 bg-zinc-100 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                    <img src={delete_logo} alt='delete url'></img>
                </div>
            </div>
        </div>
    )
}

export default DraftItem;