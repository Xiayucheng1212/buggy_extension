
import React, { Component } from 'react';
import draft_logo from '../imgs/draft.png';
import stack_logo from '../imgs/stack_icon.png';
import Button from './Button';
import SearchBar from './SearchBar';
import Form from './Form';
import { Link } from 'react-router-dom';

class AddPage extends Component {
    render() {
        return (
            <>
                <div className="w-[350px] h-[500px] p-[30px] bg-white flex-col justify-start items-center gap-[14px] inline-flex">
                    <div className="self-stretch h-10 justify-start items-center gap-2.5 inline-flex">
                        <SearchBar disabled={true}/>
                        <Link to="/"><Button logo={stack_logo} /></Link>
                        <Link to="/draft"><Button logo={draft_logo} /></Link>
                    </div>
                    <div className="w-full h-10 flex-col justify-start items-start inline-flex font-bold">Add Link</div>
                    <Form />
                </div>
            </>
        );
    }
}

export default AddPage;
