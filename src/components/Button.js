import React from 'react';


class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: props.logo,
        };
    }

    render() {
        return (
            <>
            <div className="w-10 h-10 relative rounded-[5px] flex-col justify-start items-start inline-flex">
              <div className="pl-[10px] pr-[10px] pt-[10px] pb-[10px] hover:bg-zinc-200 bg-zinc-100 rounded-[5px] justify-center items-center inline-flex">
                    <img className="w-[20px] h-[20px]" src={this.state.logo} alt='erase_button' />
                </div>
            </div>
            </>
        );
    }
}

export default Button;