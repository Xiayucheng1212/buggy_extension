/* global chrome */
import React, { useState, useEffect } from 'react';
import draft_logo from '../imgs/draft.png';
import stack_logo from '../imgs/stack_icon.png';
import Button from './Button';
import SearchBar from './SearchBar';
import Form from './Form';
import { Link } from 'react-router-dom';
import DraftCountNotification from './DraftCountNotification';

const AddPage = () => {

    const [draftCount, setDraftCount] = useState(0);

    useEffect(() => {
        if (!chrome.action) return;
        chrome.action.getBadgeText({}, (badgeText) => {
            console.log(badgeText);
            let count = parseInt(badgeText) || 0;
            setDraftCount(count);
        });
    }, []);

    return (
        <>
            <div className="w-[350px] h-[500px] p-[30px] bg-white flex-col justify-start items-center gap-[14px] inline-flex">
                <div className="self-stretch h-10 justify-start items-center gap-2.5 inline-flex">
                    <SearchBar disabled={true} />
                    <Link to="/"><Button logo={stack_logo} /></Link>
                    <Link className='relative' to="/draft">
                        <Button logo={draft_logo} />
                        <DraftCountNotification draftCount={draftCount} />
                    </Link>
                </div>
                <div className="w-full h-10 flex-col justify-start items-start inline-flex font-bold">Add Link</div>
                <Form />
            </div>
        </>
    );
}

export default AddPage;
