import React from 'react';
import up_logo from '../imgs/up-arrow.png';
import link_logo from '../imgs/link_icon.png';
import delete_logo from '../imgs/delete.png';

export default function DraftItem() {
    return (
        <div class="w-full h-[30px] pl-1.5 justify-start items-center gap-2.5 inline-flex">
            <div class="w-[200px] h-[30px] pr-[11px] flex-col justify-center items-start inline-flex">
                <div class="text-neutral-600 text-xs font-bold font-['Jost']">import error</div>
                <div class="text-neutral-600 text-[10px] font-medium font-['Jost']">https://stackoverflow.1213.com</div>
            </div>
            <div class="w-[47px] h-[30px] flex justify-center items-center relative">
                <div class="w-5 h-5 p-[5px] left-[54px] top-0 absolute bg-zinc-100 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                    <img src={delete_logo}></img>
                </div>
                <div class="w-5 h-5 p-[5px] left-[27px] top-0 absolute bg-zinc-100 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                    <img src={link_logo}></img>
                </div>
                <div class="w-5 h-5 p-[5px] left-0 top-0 absolute bg-zinc-100 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                    <img src={up_logo}></img>
                </div>
            </div>
        </div>
    )
}