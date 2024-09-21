import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import DraftCountNotification from './DraftCountNotification';
import Button from './Button';
import HomeButton from './HomeButton';
import AppContext from '../AppContext';

import stack_logo from '../imgs/stack-icon.png';
import add_logo from '../imgs/add-icon.png';
import draft_logo from '../imgs/draft.png';

const Navbar = (props) => {
   const setSearchBarInput = useContext(AppContext).setSearchBarInput;
    const [draftCount, setDraftCount] = useState(0);

    const handleSearch = (input) => {
        setSearchBarInput(input);
    }

    useEffect(() => {
        chrome.storage.local.get("draftCount", (data) => {
            setDraftCount(data.draftCount || 0);
        });

        const handleStorageChange = (changes, area) => {
            if (area === "local" && changes.draftCount) {
                setDraftCount(changes.draftCount.newValue || 0);
            }
        }

        chrome.storage.onChanged.addListener(handleStorageChange);
        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        }
    }, []);

    return (
        <div className="self-stretch h-10 mb-2 justify-start items-center gap-2 inline-flex">
            <Link to="/"><HomeButton logo={stack_logo} /></Link>
            <SearchBar handleSearch={handleSearch} disabled={!props.isHomePage}/>
            <Link to="/add"><Button logo={add_logo} /></Link>
            <Link className="relative" to="/draft">
                <Button logo={draft_logo} />
                <DraftCountNotification draftCount={draftCount} />
            </Link>
        </div>
    )
}

export default Navbar;