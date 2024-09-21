import React, { useState, useEffect, useRef } from 'react';

import LinkItem from './LinkItem';

import toggle_icon from '../imgs/right-arrow.png';

const TagItem = (props) => {
    const [name, setName] = useState(props.name);
    const [toggle, setToggle] = useState(false);
    const [edting, setEditing] = useState(false);
    const inputRef = useRef(null);
    const [links, setLinks] = useState(props.links);

    useEffect(() => {
        if (links.length === 0) setToggle(false);
        setLinks(props.links);
    }, [props.links]);

    useEffect(() => {
        if(!edting) return;
        inputRef.current.focus();
    }, [edting]);

    const handleClick = () => {
        setToggle(!toggle);
    }

    const handleDoubleClick = () => {
        setEditing(true);
    }

    const handleEditing = (e) => {
        setName(e.target.value);
    }

    const handleFinishEditing = () => {
        setToggle(false);
        setEditing(false);
        if(name.length === 0 || name === props.name) {
            setName(props.name);
            return;
        }
        props.editTag(props.id, name);
    }

    const rotation = toggle ? 'rotate(90deg)' : 'rotate(0deg)';
    return (
        <>
            <div className="self-stretch h-[35px] bg-white justify-start items-center gap-[10px] inline-flex flex-shrink-0">
                <div className='p-2 hover:bg-zinc-200 rounded-[5px]' style={{ cursor: 'pointer' }} onClick={handleClick}>
                    <img className="w-[15px] h-[15px] select-none" src={toggle_icon} alt='erase_button' style={{ transform: rotation, transition: 'transform 0.2s' }} />
                </div>
                <div className='w-full' onDoubleClick={handleDoubleClick}>
                    {edting ?
                        <input
                            className="leading-normal h-[30px] text-neutral-600 text-xl font-medium font-['Jost'] w-full bg-transparent resize-none"
                            type="text"
                            ref={inputRef}
                            value={name}
                            onChange={handleEditing}
                            onBlur={handleFinishEditing}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleFinishEditing();
                                }
                            }}
                        /> :
                        <div className="leading-normal grow shrink h-[30px] select-none text-neutral-600 text-xl font-medium font-['Jost']">{name}</div>
                    }
                </div>
            </div>
            {toggle &&
                <>
                    {links.map((link, i) => (
                        <LinkItem key={i} id={link.id} name={link.name} url={link.url} setLinks={setLinks} setTags={props.setTags} />
                    ))}
                </>
            }
        </>
    )
}

export default TagItem;
