/* global chrome */
import React, { useEffect, useState, useContext, useRef } from 'react';
import Form from './Form';
import { useParams } from 'react-router-dom';
import AppContext from '../AppContext';
import DraftController from '../controller/DraftController';

const EditPage = (props) => {
    var draftController = useRef(null);
    const dbProm = useContext(AppContext).dbProm;
    const { id } = useParams();
    const [draft, setDraft] = useState({
        id: 0,
        name: "modulenotfound",
        url: "https://winston.com",
        description: "This is a description"
    });

    useEffect(() => {
        dbProm.then((db) => {
            draftController.current = new DraftController(db);
            console.log(id);
            draftController.current.getAll().then((drafts) => {
                var draft = drafts.find((draft) => draft.id === parseInt(id));
                setDraft(draft);
            });
        });
    }, []);

    function handleDeleteDraft(id) {
        draftController.current.delete(id).then(() => {
            console.log("deleted");
        });
    }

    return (
        <>
            <div className="h-full self-stretch bg-white flex-col justify-start items-center gap-[14px] inline-flex">
                <div className="w-full h-10 flex-col justify-start items-start inline-flex font-bold">Push Draft To Stack</div>
                <Form draft_id={draft.id} url={draft.url} name={draft.name} description={draft.description} handleDeleteDraft={handleDeleteDraft} />
            </div>
        </>
    );
}

export default EditPage;
