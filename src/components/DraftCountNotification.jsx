import React, { useState } from "react";

const DraftCountNotification = (props) => {
    return (
        <>
            {props.draftCount ? 
                <div className="absolute -top-1 -right-1 rounded-[5px] flex justify-center items-center" style={{ backgroundColor: "#8AB4F8" }}>
                    <div className=" text-[10px] px-[5px]">{props.draftCount}</div>
                </div>
                : null}
        </>
    )
}

export default DraftCountNotification;