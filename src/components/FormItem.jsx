import React from 'react';

import x_button from '../imgs/x-mark.png';

export default function FormItem(props) {
    
    function handleClear() {
        props.setValue(props.name, '')
    }

    return (
        <>
            <div className="self-stretch h-[73px] p-[9px] bg-zinc-100 rounded-[5px] flex-col justify-center items-start gap-[5px] flex">
                <div className="h-5 text-black text-[13px] font-bold text-neutral-600 font-['Jost'] leading-3">{props.label}</div>
                <div className="self-stretch h-[30px] pl-[10px] pr-2.5 py-[5px] bg-zinc-300 rounded-[5px] justify-end items-center inline-flex">
                    <input className="w-full mr-[10px] bg-transparent resize-none text-neutral-600 text-xs font-medium font-['Jost'] required" 
                            {...props.register(props.name, props.rules)} />

                    <img className="w-3 h-3 relative flex-col justify-center items-center opacity-[0.7]" onClick={handleClear} src={x_button} alt="erase"/>
                </div>
            </div>
        </>
    );
}
