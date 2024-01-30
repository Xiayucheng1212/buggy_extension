
import React from 'react';
import { useForm } from "react-hook-form";
import FormItem from './FormItem';


export default function Form() {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-[100%] h-[100%] flex-col justify-start items-center inline-flex gap-[18px]'>
                <FormItem name="url" label="URL" register={register} />
                <FormItem name="name" label="Name" register={register} />
                <FormItem name="description" label="Description" register={register} />
                {/* Add Button */}
                <div className="w-[100px] px-[17px] py-2 hover:bg-red-600 bg-red-400 rounded-[5px] justify-center items-center gap-2.5 inline-flex">
                    <input type='submit' className="w-[61px] h-[13px] text-center text-white text-[15px] font-normal font-['Jost'] leading-[14.10px]" value="Add"></input>
                </div>
            </div>
        </form>
    );
}