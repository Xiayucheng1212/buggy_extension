import React from 'react';
import up_logo from '../imgs/up-arrow.png';
import delete_logo from '../imgs/delete.png';
import CopyToClipboardButton from './CopyToClipboardButton';
import { Link, useNavigate } from 'react-router-dom';

const DraftItem = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/edit/${props.id}`);
    }
    return (
        <div className="h-[35px] self-stretch px-2 justify-between items-center inline-flex hover:bg-zinc-200 ">
            <div className="w-[200px] h-[30px] pr-[10px] flex-col justify-center items-start inline-flex cursor-pointer" onClick={handleClick}>
                <div className="w-[190px] text-neutral-600 text-xs font-bold font-['Jost'] truncate hover:text-clip">{props.name}</div>
                <div className="w-[190px] text-neutral-600 text-[10px] font-medium font-['Jost'] truncate hover:text-clip">{props.url}</div>
            </div>
            <div className="h-[30px] flex justify-between items-center space-x-2">
                <CopyToClipboardButton url={props.url} size={6}/>
                <Link className="w-6 h-6 p-[6px] hover:bg-zinc-200 bg-zinc-100 rounded-[5px] justify-center items-center inline-flex" to={`/edit/${props.id}`}>
                        <img src={up_logo} alt='upload url' />
                </Link>
                <div onClick={() => props.handleDelete(props.id)} className="w-6 h-6 p-[6px] hover:bg-zinc-200 bg-zinc-100 rounded-[5px] justify-center items-center inline-flex"
                    style={{ cursor: 'pointer' }}
                >
                    <img src={delete_logo} alt='delete url'></img>
                </div>
            </div>
        </div>
    )
}

export default DraftItem;