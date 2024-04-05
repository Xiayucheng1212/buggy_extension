/*global chrome*/
import React, { useContext, useEffect, useState } from 'react';

import DraftItem from './DraftItem';
import EmptyInformation from './EmptyInformation';
import AppContext from '../AppContext';

const DraftPage = () => {
    const dbProm = useContext(AppContext).dbProm;
    const setDraftCount = useContext(AppContext).setDraftCount;
    const [drafts, setDrafts] = useState([]);

    const handleDelete = (id) => {
        let newDrafts = drafts.filter(draft => draft.id !== id);
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
            setDraftCount(minus_one_count);
        });
    }

    const getDrafts = () => {
        dbProm.then((db) => {
            db.transaction('drafts').objectStore('drafts').getAll().then((drafts) => {
                setDrafts(drafts);
            });
        });
    }

    useEffect(() => {
        getDrafts();
    });

    useEffect(() => {
        if (!chrome.runtime) return;
        const AddDraftByShortcutListener = (request, sender, sendResponse) => {
            console.log(request);
            if (request.type === "add-draft") {
                getDrafts();
                sendResponse({ status: "received" });
            }
        }
        chrome.runtime.onMessage.addListener(AddDraftByShortcutListener);
        return () => {
            chrome.runtime.onMessage.removeListener(AddDraftByShortcutListener);
        }
    });

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

export default DraftPage;