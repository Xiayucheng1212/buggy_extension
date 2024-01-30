import React from 'react';
import x_button from '../imgs/x-mark.png';

export default function FormItem(props) {


    return (
        <>
            <div className="self-stretch h-[73px] p-[9px] bg-zinc-100 rounded-[5px] flex-col justify-center items-start gap-[5px] flex">
                <div className="w-[105px] h-5 text-black text-[13px] font-normal font-['Jost'] leading-3">{props.label}</div>
                <div className="w-[269px] h-[30px] pl-[10px] pr-2.5 py-[5px] bg-zinc-300 rounded-[5px] justify-end items-center inline-flex">
                    <input className="w-full h-[24px] mr-[10px] bg-transparent resize-none text-neutral-600 text-xs font-medium font-['Jost']" 
                            {...props.register(props.name)} />
                    <img className="w-3 h-3 relative flex-col justify-center items-center" src={x_button} alt="erase"/>
                </div>
            </div>
        </>
    );
}
