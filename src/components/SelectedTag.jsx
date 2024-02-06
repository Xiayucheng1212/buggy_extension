import React from "react";
import x_button from "../imgs/x-button.png";

const SelectedTag = (props) => {
    return (
        <div className="w-auto h-[20px] px-[5px] py-[5px] flex justify-center items-center bg-zinc-100 rounded-[3px] select-none gap-x-2">
            <div className="whitespace-nowrap text-neutral-600 text-xs font-medium font-['Jost']">{props.name}</div>
            <div className="w-2 h-2 cursor-pointer" onClick={() => props.onClick(props.name)}>
                <img
                    className="w-2 h-2 justify-center items-center"
                    src={x_button}
                    alt="erase"
                />
            </div>
        </div>
    );
}

export default SelectedTag;