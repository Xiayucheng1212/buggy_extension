/*global chrome*/
import React, { useContext, useEffect, useState } from 'react';

import DraftItem from './DraftItem';
import EmptyInformation from './EmptyInformation';
import AppContext from '../AppContext';

export default function DraftPage() {
    const context = useContext(AppContext);
    const dbProm = context.dbProm;
    var [drafts, setDrafts] = useState([]);

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
            context.setDraftCount(minus_one_count);
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
        <div className="h-full self-stretch bg-white flex-col justify-start items-center gap-1.5 inline-flex">
            {drafts.length === 0 ?
                <EmptyInformation information={"No Drafts."} /> :
                drafts.map((draft, i) =>
                    <DraftItem key={i} name={draft.name} url={draft.url} id={draft.id} handleDelete={handleDelete} />
                )
            }
        </div>
    )
}