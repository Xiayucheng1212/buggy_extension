import React from 'react';
import SearchBar from './SearchBar';
import Button from './Button';
import stack_logo from '../imgs/stack_icon.png';
import add_logo from '../imgs/add_icon.png';

import { Link } from 'react-router-dom';
import DraftItem from './DraftItem';


export default function DraftPage() {
    return (
        <>
            <div className="w-[350px] h-[500px] px-[30px] pt-[30px] pb-[106px] bg-white flex-col justify-start items-center gap-[18px] inline-flex">
                <div className="self-stretch h-10 justify-start items-center gap-2.5 inline-flex">
                    <SearchBar />
                    <Link to="/add"><Button logo={add_logo} /></Link>
                    <Link to="/"><Button logo={stack_logo} /></Link>
                </div>
                <DraftItem />
            </div>
        </>
    )
}