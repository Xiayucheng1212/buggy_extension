import React from "react";

const EmptyInformation = (props) => {
    return (
        <div className="h-full flex justify-start items-center">
            <div className="select-none text-neutral-600 text-xl font-medium font-['Jost']">{props.information}</div>
        </div>
    )
}

export default EmptyInformation;