import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import FormItem from './FormItem';
import FormTagItem from './FormTagItem';
import { useContext } from 'react';
import AppContext from '../AppContext';
import LinkController from '../controller/LinkController';


export default function Form(props) {

    const { register, handleSubmit, setValue } = useForm();
    const dbProm = useContext(AppContext).dbProm;
    const setDraftCount = useContext(AppContext).setDraftCount;
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        dbProm.then(async (db) => {
            const linkController = new LinkController(db);
            await linkController.addLink(data)
            console.log("added");
            if (props.handleDeleteDraft !== undefined) {
                props.handleDeleteDraft(props.draft_id);
            }
            // update badge count   
            chrome.action.getBadgeText({}, (badgeText) => {
                let minus_one = parseInt(badgeText) - 1;
                let minus_one_count = minus_one > 0 ? minus_one.toString() : "";
                chrome.action.setBadgeText({ text: minus_one_count });
                setDraftCount(minus_one_count);
            });
            // jump back to home page
            navigate('/', { replace: true });
        });
    }

    useEffect(() => {
        if (props.url !== undefined) setValue('url', props.url);
        if (props.name !== undefined) setValue('name', props.name);
        if (props.description !== undefined) setValue('description', props.description);
    });

    return (
        <div className="h-auto overflow-y-scroll">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-[100%] h-[100%] flex-col justify-start items-center inline-flex gap-[18px]'>
                    <FormItem name="url" label="URL*" register={register} setValue={setValue}/>
                    <FormItem name="name" label="Name" register={register} setValue={setValue} />
                    <FormItem name="description" label="Description" register={register} setValue={setValue} />
                    <FormTagItem name="tags" label="Tags*" register={register} setValue={setValue} />
                    {/* Add Button */}
                    <div className="w-[100px] px-[17px] py-2 hover:bg-red-600 bg-red-400 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                        <input type='submit' className="w-[61px] h-[13px] text-center text-white text-[15px] font-normal font-['Jost'] leading-[14.10px]" value="Add"></input>
                    </div>
                </div>
            </form>
        </div>
    );
}