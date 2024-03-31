import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import DraftCountNotification from './DraftCountNotification';
import Button from './Button';
import HomeButton from './HomeButton';

import stack_logo from '../imgs/stack_icon.png';
import add_logo from '../imgs/add_icon.png';
import draft_logo from '../imgs/draft.png';

const Navbar = () => {
    const [draftCount, setDraftCount] = useState(0);

    const handleSearch = (searchBarInput) => {
        console.log(searchBarInput);
    }

    useEffect(() => {
        if (!chrome.action) return;
        chrome.action.getBadgeText({}, (badgeText) => {
            console.log(badgeText);
            let count = parseInt(badgeText) || 0;
            setDraftCount(count);
        });
    });

    return (
        <div className="self-stretch h-10 mb-2 justify-start items-center gap-2 inline-flex">
            <Link to="/"><HomeButton logo={stack_logo} /></Link>
            <SearchBar handleSearch={handleSearch}/>
            <Link to="/add"><Button logo={add_logo} /></Link>
            <Link className="relative" to="/draft">
                <Button logo={draft_logo} />
                <DraftCountNotification draftCount={draftCount} />
            </Link>
        </div>
    )
}

export default Navbar;