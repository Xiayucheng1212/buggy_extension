import TagController from "./TagController";

var LinkController = function (db) {
    this.db = db;
    this.collection_name = "links";
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
        console.log(tags);
        console.log(link.tags);
        link_tag_ids = link.tags.map((tag) => {
            return tags.find((t) => t.name === tag);
        }).map((tag) => tag.id);

        console.log(link_tag_ids);

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

export default LinkController;