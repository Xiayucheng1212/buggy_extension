import TagController from "./TagController";

var LinkController = function (db) {
    this.db = db;
    this.collection_name = "links";
}

// @param linkIds: array
LinkController.prototype.getLinks = async function (linkIds) {
    var links = [];
    for (let id of linkIds) {
        let link = await this.db.transaction('links').objectStore('links').get(id);
        links.push(link);   
    }
    return links;
}

LinkController.prototype.delete = async function (link_id) {
    // find all tags under this link and delete this link from the tags
    var tagController = new TagController(this.db);
    var newAllTags = [];
    var link = await this.db.transaction('links').objectStore('links').get(link_id);
    newAllTags = await tagController.deleteLinkFromTag(link.tags, link_id);
    await this.db.transaction('links', 'readwrite').objectStore('links').delete(link_id);

    return newAllTags;
}

LinkController.prototype.getAll = function () {
    return this.db.transaction('links').objectStore('links').getAll().then((links) => {
        return links;
    });
}

LinkController.prototype.addLink = function (link) {
    // Find all tags that has the same name with the incoming link's tag
    var link_tag_ids = [];
    var tagController = new TagController(this.db);

    return tagController.getAll().then(async (tags) => {
        link_tag_ids = link.tags.map((tag) => {
            return tags.find((t) => t.name === tag);
        }).map((tag) => tag.id);

        var link_id = await this.db.transaction('links', 'readwrite').objectStore('links')
                .add( {
                    name: link.name,
                    url: link.url,
                    description: link.description,
                    tags: link_tag_ids
                })

        tagController.addLinkToTag(link_tag_ids, link_id);
    })

}

LinkController.prototype.searchLinksByKeywords = function (keyword) {
    let new_links = [];
    keyword = keyword.toLowerCase();
    return this.db.transaction('links').objectStore('links').getAll().then((links) => {
        links.forEach((link) => {
            if (link.name.toLowerCase().includes(keyword) || link.description.toLowerCase().includes(keyword)) {
                new_links.push(link);
            }
        });
        return new_links;
    });
}

export default LinkController;