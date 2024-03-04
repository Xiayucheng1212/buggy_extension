
import React, { useEffect, useState, useContext, useRef } from 'react';
import draft_logo from '../imgs/draft.png';
import stack_logo from '../imgs/stack_icon.png';
import Button from './Button';
import SearchBar from './SearchBar';
import Form from './Form';
import { Link, useParams } from 'react-router-dom';
import DBContext from '../DBContext';
import DraftController from '../controller/DraftController';

const EditPage = (props) => {
  var draftController = useRef(null);
  const dbProm = useContext(DBContext).dbProm;
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
            draftController.current.get(id).then((draft) => {
                // setDraft(draft);
                console.log(draft);
            });
        });
    }, []);

    function handleDeleteDraft(id) {
        draftController.current.delete(id).then(() => {
            console.log("deleted");
            window.location.href = "#/draft";
        });
    }

    return (
        <>
            <div className="w-[350px] h-[500px] p-[30px] bg-white flex-col justify-start items-center gap-[14px] inline-flex">
                <div className="self-stretch h-10 justify-start items-center gap-2.5 inline-flex">
                    <SearchBar disabled={true}/>
                    <Link to="/"><Button logo={stack_logo} /></Link>
                    <Link to="/draft"><Button logo={draft_logo} /></Link>
                </div>
                <div className="w-full h-10 flex-col justify-start items-start inline-flex font-bold">Push Draft To Stack</div>
                <Form draft_id={draft.id} url={draft.url} name={draft.name} description={draft.description} handleDeleteDraft={handleDeleteDraft}/>
            </div>
        </>
    );
}

export default EditPage;
