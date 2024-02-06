
import React, { useState } from 'react';
import toggle_icon from '../imgs/right-arrow.png';
import LinkItem from './LinkItem';

const TagItem = (props) => {
    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        setToggle(!toggle);
    }

    const rotation = toggle ? 'rotate(90deg)' : 'rotate(0deg)';
    return (
        <>
            <div className="self-stretch pl-2.5 rounded-[5px] hover:bg-zinc-200 bg-white justify-start items-center gap-[15px] inline-flex" onClick={handleClick}>
                <div>
                    <img className="w-[15px] h-[15px]" src={toggle_icon} alt='erase_button' style={{ transform: rotation, transition: 'transform 0.2s' }} />
                </div>
                <div className="grow shrink basis-0 h-[29px] select-none text-neutral-600 text-xl font-medium font-['Jost']">{props.tag}</div>
            </div>
            {toggle && 
                <>
                    <LinkItem />
                    <LinkItem />
                </>
            }
        </>
    )
}

export default TagItem;
