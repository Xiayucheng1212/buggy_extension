import React, { useState, useEffect } from "react";
import axios from "axios";
import x_button from "../imgs/x-mark.png";
import Tag from "./Tag";
import SelectedTag from "./SelectedTag";

const FormTagItem = (props) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectTags] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_PROD + "/tag/all/name").then((response) => {
      setTags(response.data.map((tag) => tag.name));
    });
  }, []);

  useEffect(() => {
    props.register('tags', { value: selectedTags })
    props.setValue('tags', selectedTags);
  }, [props.setValue, props.register, selectedTags]);

  const handleTagClick = (name) => {
    if (selectedTags.find((tag) => tag === name)) return;
    setSelectTags([...selectedTags, name]);
  };

  const handleClearOne = (name) => {
    setSelectTags(selectedTags.filter((tag) => tag !== name));
  };

  const handleClearAll = () => {
    setSelectTags([]);
  };

  const handleAddNewTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (tags.find((tag) => tag === newTag)) return;

      axios.post(process.env.REACT_APP_SERVER_PROD + "/tag/add", { name: newTag })
        .then((response) => {
          setTags([...tags, newTag]);
          setSelectTags([...selectedTags, newTag]);
          e.target.value = "";
        });
    }
  };

  return (
    <div className="self-stretch p-[9px] bg-zinc-100 rounded-[5px] flex-col justify-center items-start flex">
      <div className="w-[105px] h-5 text-black text-[13px] font-normal font-['Jost'] leading-3">
        {props.label}
      </div>
      <div className="self-stretch h-[30px] pl-[10px] pr-2.5 py-[5px] bg-zinc-300 rounded-t-[5px] flex space-x items-center">
        <div className="w-[230px] h-[24px] flex mr-[10px] bg-transparent bg-zinc-300 justify-start items-center gap-x-2 overflow-x-scroll">
          {selectedTags.length === 0 ? (
            <input
              className="bg-transparent resize-none text-neutral-600 text-xs font-medium font-['Jost']"
              disabled
              placeholder="Click to select"
            />
          ) : (
            selectedTags.map((tag, i) => (
              <SelectedTag key={i} name={tag} onClick={handleClearOne} />
            ))
          )}
        </div>
        <div className="w-3 h-3" onClick={handleClearAll}>
          <img
            className="w-3 h-3 justify-center items-center"
            src={x_button}
            alt="erase"
          />
        </div>
      </div>
      <div className="w-full flex flex-wrap p-[10px] bg-white rounded-b-[5px] justify-start items-center gap-2">
        {tags.map((tag, i) => (
          <Tag key={i} name={tag} onClick={handleTagClick} />
        ))}
        <div className="w-full h-[30px] pl-[10px] pr-2.5 py-[5px] bg-zinc-300 rounded-[5px] justify-end items-center inline-flex">
          <input
            className="w-full mr-[10px] bg-transparent resize-none text-neutral-600 text-xs font-medium font-['Jost']"
            placeholder="Add a tag"
            onKeyDown={handleAddNewTag}
          />
          <img
            className="w-3 h-3 relative flex-col justify-center items-center"
            src={x_button}
            alt="erase"
          />
        </div>
      </div>
    </div>
  );
};

export default FormTagItem;
