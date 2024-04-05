import React, { useState, useEffect, useContext } from "react";
import x_button from "../imgs/x-mark.png";
import Tag from "./Tag";
import SelectedTag from "./SelectedTag";
import TagController from "../controller/TagController";
import AppContext from "../AppContext";

const FormTagItem = (props) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectTags] = useState([]);
  const dbProm = useContext(AppContext).dbProm;


  useEffect(() => {
    dbProm.then((db) => {
      const tagController = new TagController(db);
      tagController.getAll().then((tags) => {
        setTags(tags.map((tag) => tag.name));
      });
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
    function isEmptyString(str){
      return str === null || str === '';
    }

    function removeSpace(str) {
      return str.replace(/\s+/g, '');
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = removeSpace(e.target.value.trim());
      if (isEmptyString(newTag) || tags.find((tag) => tag === newTag)) return;

      dbProm.then((db) => {
        const tagController = new TagController(db);
        tagController.addTag(newTag).then((tag) => {
          setTags([...tags, newTag]);
          setSelectTags([...selectedTags, newTag]);
          e.target.value = "";
        });
      });
    }
  };

  return (
    <div className="w-[310px] p-[9px] bg-zinc-100 rounded-[5px] flex-col justify-center items-start flex">
      <div className="w-[105px] h-5 text-black text-[13px] font-normal font-['Jost'] leading-3">
        {props.label}
      </div>
      <div className="w-full h-[30px] pl-[10px] pr-2.5 py-[5px] bg-zinc-300 rounded-t-[5px] flex justify-between items-center">
        <div className="w-full resize-none flex mr-[10px] bg-transparent bg-zinc-300 items-center overflow-x-auto">
          {selectedTags.length === 0 ? (
            <input
              className="bg-transparent resize-none text-neutral-600 text-xs font-medium font-['Jost']"
              disabled
              placeholder="Click to select"
            />
          ) : (
            <div className="w-full flex gap-x-2 overflow-x-scroll">
              {selectedTags.map((tag, i) => (
                <SelectedTag key={i} name={tag} onClick={handleClearOne} />
              ))}
            </div>
          )}
        </div>
        <img
          className="w-3 h-3 justify-center items-center"
          onClick={handleClearAll}
          src={x_button}
          alt="erase"
        />
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
