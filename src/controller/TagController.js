var TagController = function (db) {
    this.db = db;
    this.collection_name = "tags";
}

TagController.prototype.deleteLinkFromTag = function (tag_ids, link_id) {
    return this.db.transaction('tags', 'readwrite').objectStore('tags').getAll().then((tags) => {
        tags.forEach(async (tag) => {
            if (tag_ids.includes(tag.id)) {
                tag.links = tag.links.filter((link) => link !== link_id);
                await this.db.transaction('tags', 'readwrite').objectStore('tags').put(tag);

                if (tag.links.length === 0) {
                    await this.db.transaction('tags', 'readwrite').objectStore('tags').delete(tag.id);
                }
            }
        });
    });
}

TagController.prototype.getAll = function () {
    return this.db.transaction('tags').objectStore('tags').getAll().then((tags) => {
        return tags;
    });
}

TagController.prototype.addTag = function (newTag) {
    return this.db.transaction('tags', "readwrite").objectStore('tags').add({name: newTag, links: []}).then((tag) => {
        return tag;
    });
}

TagController.prototype.addLinkToTag = function (tag_ids, link_id) {
    return this.db.transaction('tags', 'readwrite').objectStore('tags').getAll().then((tags) => {
        tags.forEach((tag) => {
            if (tag_ids.includes(tag.id)) {
                tag.links.push(link_id);
                this.db.transaction('tags', 'readwrite').objectStore('tags').put(tag);
            }
        });
    });
}

TagController.prototype.getAllLinksByTags = function () {
    var new_tags = [];
    return this.db.transaction('tags').objectStore('tags').getAll().then((tags) => {
        tags.forEach((tag) => {
            var new_tag = {name: tag.name, links: []};

            tag.links.forEach((link) => {
                this.db.transaction('links').objectStore('links').get(link).then((l) => {
                    new_tag.links.push(l);
                });
            });

            new_tags.push(new_tag);
        });
        console.log(new_tags)
        return new_tags;
    });

}

export default TagController;
