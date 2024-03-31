import React, { useState } from "react";

const DraftCountNotification = (props) => {
    return (
        <>
            {props.draftCount ? 
                <div className="absolute -top-1 -right-1 h-[15px] w-[15px] rounded-[5px] flex justify-center items-center" style={{ backgroundColor: "#8AB4F8" }}>
                    <div className="select-none text-[10px]">{props.draftCount}</div>
                </div>
                : null}
        </>
    )
}

export default DraftCountNotification;