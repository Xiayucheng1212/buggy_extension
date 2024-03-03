 /*global chrome*/
import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import Button from './Button';
import stack_logo from '../imgs/stack_icon.png';
import add_logo from '../imgs/add_icon.png';

import { Link } from 'react-router-dom';
import DraftItem from './DraftItem';
import EmptyInformation from './EmptyInformation';


export default function DraftPage() {
    const drafts = [{
        id: 0,
        name: "modulenotfound",
        url: "https://winston.com",
        description: "This is a description"
    }]
    return (
        <>
            <div className="w-[350px] h-[500px] px-[30px] pt-[30px] pb-[106px] bg-white flex-col justify-start items-center gap-1.5 inline-flex">
                <div className="self-stretch h-10 mb-2 justify-start items-center gap-2.5 inline-flex">
                    <SearchBar />
                    <Link to="/add"><Button logo={add_logo} /></Link>
                    <Link to="/"><Button logo={stack_logo} /></Link>
                </div>
                {drafts.length === 0 ? 
                    <EmptyInformation information={"No Drafts."} /> : 
                    drafts.map((draft, i) => 
                        <DraftItem key={i} name={draft.name} url={draft.url} id={draft.id}/>
                    )
                }
            </div>
        </>
    )
}