import React from 'react';

const HomeButton = (props) => {
    return (
        <div className="relative rounded-[5px] flex-col justify-start items-start inline-flex">
            <div className="pr-[10px] py-[10px] justify-center items-center inline-flex">
                <img className="w-[24px] h-[24px]" src={props.logo} alt='erase_HomeButton' />
            </div>
        </div>
    );
}

export default HomeButton;