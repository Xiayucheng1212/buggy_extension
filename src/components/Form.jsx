import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

import FormItem from './FormItem';
import FormTagItem from './FormTagItem';
import AppContext from '../AppContext';
import LinkController from '../controller/LinkController';

let Form = (props) => {

    const { register, handleSubmit, setValue } = useForm();
    const dbProm = useContext(AppContext).dbProm;
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // console.log(data);
        if (data.tags.length === 0) return;
        dbProm.then(async (db) => {
            const linkController = new LinkController(db);
            await linkController.addLink(data)
            // console.log("added");
            if (props.handleDeleteDraft !== undefined) {
                props.handleDeleteDraft(props.draft_id);
            }
            // update badge count
            if(props.isDraft) {
                chrome.action.getBadgeText({}, (badgeText) => {
                    let minus_one = parseInt(badgeText) - 1;
                    let minus_one_count = minus_one > 0 ? minus_one.toString() : "";
                    chrome.action.setBadgeText({ text: minus_one_count });
                    chrome.storage.local.set({ draftCount: minus_one_count }, () => {
                        console.log("Draft count updated in storage");
                    });
                });
            }
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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex-col justify-start items-center inline-flex gap-[18px]'>
                <FormTagItem
                    name="tags"
                    label="Category"
                    register={register}
                    setValue={setValue}
                />
                <FormItem
                    name="url"
                    label="Link"
                    register={register}
                    rules={{ required: "URL is required" }}
                    setValue={setValue}
                />
                <FormItem
                    name="name"
                    label="Name"
                    register={register}
                    rules={{ required: "Name is required" }}
                    setValue={setValue}
                />
                <FormItem
                    name="description"
                    label="Description (Optional)"
                    register={register}
                    setValue={setValue}
                />
            </div>
            <div className='flex justify-center items-center py-[18px]'>
                <div className="w-[100px] h-[40px] flex hover:bg-red-400 bg-red-600 rounded-[5px] justify-center items-center">
                    <input type='submit' className="w-[60px] h-[15px] text-center text-white text-[15px] font-normal font-['Jost'] leading-[14.10px]" value="Add"></input>
                </div>
            </div>
        </form>
    );
}

export default Form;