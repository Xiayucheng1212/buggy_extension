import React from "react";

const FormCategoryTag = (props) => {
    return (
        <div className="h-[20px] px-[5px] py-[5px] flex justify-center items-center bg-zinc-100 hover:bg-zinc-200 rounded-[3px] select-none cursor-pointer" onClick={() => props.onClick(props.name)}>
            <div className="whitespace-nowrap text-neutral-500 text-xs font-medium font-['Jost']">{props.name}</div>
        </div>
    );
}

export default FormCategoryTag;