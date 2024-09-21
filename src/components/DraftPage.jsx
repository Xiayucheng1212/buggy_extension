/*global chrome*/
import React, { useContext, useEffect, useState } from 'react';

import DraftItem from './DraftItem';
import EmptyInformation from './EmptyInformation';
import AppContext from '../AppContext';

const DraftPage = () => {
    const dbProm = useContext(AppContext).dbProm;
    const [drafts, setDrafts] = useState([]);

    const handleDelete = (id) => {
        let newDrafts = drafts.filter(draft => draft.id !== id);
        dbProm.then((db) => {
            db.transaction('drafts', 'readwrite').objectStore('drafts').delete(id).then(() => {
                setDrafts(newDrafts);
            });
        });
        // update badge count
        chrome.action.getBadgeText({}, (badgeText) => {
            let minus_one = parseInt(badgeText) - 1;
            let minus_one_count = minus_one > 0 ? minus_one.toString() : "";
            chrome.action.setBadgeText({ text: minus_one_count });
            chrome.storage.local.set({ draftCount: minus_one_count }, () => {
                console.log("Draft count updated in storage");
            });
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
    }, []);
    

    useEffect(() => {
        const handleStorageChange = (changes, area) => {
            if (area === "local" && changes.draftCount) {
                getDrafts();
            }
        }

        chrome.storage.onChanged.addListener(handleStorageChange);
        return () => {
            chrome.storage.onChanged.removeListener(handleStorageChange);
        }
    }, []);

    return (
        <div className="h-full self-stretch bg-white flex-col justify-start items-center gap-1.5 inline-flex overflow-y-scroll">
            {drafts.length === 0 ?
                <EmptyInformation information={"[ No Drafts ]"} /> :
                drafts.map((draft, i) =>
                    <DraftItem key={i} name={draft.name} url={draft.url} id={draft.id} handleDelete={handleDelete} />
                )
            }
        </div>
    )
}

export default DraftPage;