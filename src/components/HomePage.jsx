/* global chrome */
import React, { useState, useEffect, useContext } from "react";

import TagItem from "./TagItem";
import AppContext from "../AppContext";
import TagController from "../controller/TagController";
import LinkItem from "./LinkItem";
import LinkController from "../controller/LinkController";
import EmptyInformation from "./EmptyInformation";

const HomePage = (props) => {
	const [tags, setTags] = useState([]);
	const [searching, setSearching] = useState(false);
	const [searchedLinks, setSearchedLinks] = useState([]);
	const dbProm = useContext(AppContext).dbProm;
	const searchBarInput = useContext(AppContext).searchBarInput;

	useEffect(() => {
		dbProm.then((db) => {
			const tagController = new TagController(db);
			tagController.getAllLinksByTags().then((tags) => {
				setTags(tags);
			});
		});
	}, []);

	useEffect(() => {
		if(searchBarInput.length === 0) {
			setSearchedLinks([]);
			return;
		}
		dbProm.then((db) => {
			const linkController = new LinkController(db);
			linkController.searchLinksByKeywords(searchBarInput).then((links) => {
				setSearchedLinks(links);
			});
		});
	}, [searchBarInput]);

	useEffect(() => {
		searchedLinks.length || searchBarInput.length
			? setSearching(true)
			: setSearching(false);
	}, [searchedLinks]);

	return (
		<div className="h-full self-stretch bg-white flex-col justify-start items-center gap-1.5 inline-flex">
			{searching
				? (searchedLinks.length ? searchedLinks.map((link, i) => (
					<LinkItem key={i} id={link.id} name={link.name} url={link.url} />
				)) :
					<EmptyInformation information={"No results found."} />)
				: tags.map((tag, i) => (
					<TagItem key={i} name={tag.name} links={tag.links} setTags={setTags}/>
				))}
		</div>
	);
};

export default HomePage;
