/* global chrome */
import React from 'react';
import Form from './Form';

const AddPage = () => {
    return (
        <div className="self-stretch overflow-y-scroll bg-white flex-col justify-start items-center gap-[14px] inline-flex">
            <div className="w-full h-10 flex-col justify-start items-start inline-flex font-bold">Add Link</div>
            <Form />
        </div>
    );
}

export default AddPage;
