import React from 'react';

const HomeButton = (props) => {
    return (
        <div className="w-10 h-10 relative rounded-[5px] flex-col justify-start items-start inline-flex">
            <div className="pl-[10px] pr-[10px] pt-[10px] pb-[10px] justify-center items-center inline-flex">
                <img className="w-[20px] h-[20px]" src={props.logo} alt='erase_HomeButton' />
            </div>
        </div>
    );
}

export default HomeButton;