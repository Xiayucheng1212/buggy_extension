import React, {useState, useEffect} from 'react';
import axios from 'axios';
import draft_logo from '../imgs/draft.png';
import add_logo from '../imgs/add_icon.png';
import Button from './Button';
import SearchBar from './SearchBar';
import TagItem from './TagItem';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/tag/all")
        .then((response) => {
            setTags(response.data);
        })
  },[]);

  return (
    <div className="w-[350px] h-[500px] px-[30px] pt-[30px] pb-10 bg-white flex-col justify-start items-start gap-1.5 inline-flex">
      <div className="self-stretch h-10 mb-2 justify-start items-center gap-2.5 inline-flex">
        <SearchBar />
        <Link to="/add"><Button logo={add_logo} /></Link>
        <Link to="/draft"><Button logo={draft_logo} /></Link>
      </div>
      {tags.map((tag, i) => (
        <TagItem key={i} name={tag.name} links={tag.links} />
      ))}
    </div>
  );
};

export default HomePage;
