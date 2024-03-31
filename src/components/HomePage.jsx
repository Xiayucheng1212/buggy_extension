import React, { useState, useEffect, useContext } from "react";
import draft_logo from "../imgs/draft.png";
import add_logo from "../imgs/add_icon.png";
import Button from "./Button";
import SearchBar from "./SearchBar";
import TagItem from "./TagItem";
import { Link } from "react-router-dom";
import DBContext from "../DBContext";
import TagController from "../controller/TagController";
import LinkItem from "./LinkItem";
import LinkController from "../controller/LinkController";
import EmptyInformation from "./EmptyInformation";

const HomePage = () => {
	const [tags, setTags] = useState([]);
	const [searching, setSearching] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [searchedLinks, setSearchedLinks] = useState([]);
	const dbProm = useContext(DBContext).dbProm;

	useEffect(() => {
		dbProm.then((db) => {
			const tagController = new TagController(db);
			tagController.getAllLinksByTags().then((tags) => {
				setTags(tags);
			});
		});
	}, []);

	useEffect(() => {
		searchedLinks.length || keyword.length
			? setSearching(true)
			: setSearching(false);
	}, [searchedLinks]);

	let handleSearch = (searchBarInput) => {
		console.log(searching);
		setKeyword(searchBarInput);
		if (searchBarInput === "") {
			setSearchedLinks([]);
			return;
		}
		dbProm.then((db) => {
			const linkController = new LinkController(db);
			linkController.searchLinksByKeywords(searchBarInput).then((links) => {
				setSearchedLinks(links);
			});
		});
	};

	return (
		<div className="w-[350px] h-[500px] px-[30px] pt-[30px] pb-10 bg-white flex-col justify-start items-center gap-1.5 inline-flex">
			<div className="self-stretch h-10 mb-2 justify-start items-center gap-2.5 inline-flex">
				<SearchBar handleSearch={handleSearch} />
				<Link to="/add">
					<Button logo={add_logo} />
				</Link>
				<Link to="/draft">
					<Button logo={draft_logo} />
				</Link>
			</div>
			{searching
				? (searchedLinks.length ? searchedLinks.map((link, i) => (
					<LinkItem key={i} id={link.id} name={link.name} url={link.url} />
				)) :
					<EmptyInformation information={"No results found."} />)
				: tags.map((tag, i) => (
					<TagItem key={i} name={tag.name} links={tag.links} />
				))}
		</div>
	);
};

export default HomePage;
