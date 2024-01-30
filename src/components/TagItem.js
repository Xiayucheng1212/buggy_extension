
import React, { Component } from 'react';
import toggle_icon from '../imgs/right-arrow.png';

class TagItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: props.tag,
        };
    }

    render() {
        return (
            <>
                <div className="self-stretch pl-2.5 rounded-[5px] hover:bg-zinc-200 bg-white justify-start items-center gap-[15px] inline-flex">
                    <div>
                        <img className="w-[20px] h-[20px]" src={toggle_icon} alt='erase_button' />
                    </div>
                    <div className="grow shrink basis-0 h-[29px]  text-neutral-600 text-xl font-medium font-['Jost']">C++</div>
                </div>
            </>
        )
    }
}

export default TagItem;
