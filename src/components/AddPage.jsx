/* global chrome */
import React from 'react';

import Form from './Form';

const AddPage = () => {
    return (
        <div className="self-stretch overflow-y-scroll bg-white flex-col justify-start items-center gap-[14px] inline-flex">
            <div className="w-full h-10 flex-col justify-center items-center inline-flex text-xl font-bold text-neutral-600 font-['Jost'] select-none">[ Add Link ]</div>
            <Form isDraft={false} />
        </div>
    );
}

export default AddPage;
