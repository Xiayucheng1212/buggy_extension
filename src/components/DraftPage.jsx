/*global chrome*/
import React, { useContext, useEffect } from 'react';
import SearchBar from './SearchBar';
import Button from './Button';
import stack_logo from '../imgs/stack_icon.png';
import add_logo from '../imgs/add_icon.png';

import { Link } from 'react-router-dom';
import DraftItem from './DraftItem';
import EmptyInformation from './EmptyInformation';
import DBContext from '../DBContext';

export default function DraftPage() {
    const dbProm = useContext(DBContext).dbProm;
    var [drafts, setDrafts] = React.useState([]);

    function handleDelete(id) {
        var newDrafts = drafts.filter(draft => draft.id !== id);
        dbProm.then((db) => {
            db.transaction('drafts', 'readwrite').objectStore('drafts').delete(id).then(() => {
                console.log("deleted");
                setDrafts(newDrafts);
            });
        });
        // update badge count
        chrome.action.getBadgeText({}, (badgeText) => {
            let minus_one = parseInt(badgeText) - 1;
            let minus_one_count = minus_one > 0 ? minus_one.toString() : "";
            chrome.action.setBadgeText({ text: minus_one_count });
        });
    }

    useEffect(() => {
        dbProm.then((db) => {
            db.transaction('drafts').objectStore('drafts').getAll().then((drafts) => {
                setDrafts(drafts);
            });
        });
    }, []);

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
                        <DraftItem key={i} name={draft.name} url={draft.url} id={draft.id} handleDelete={handleDelete} />
                    )
                }
            </div>
        </>
    )
}