var DraftController = function (db) {
    this.db = db;
    this.collection_name = "drafts";
}

DraftController.prototype.delete = function(id) {
    return this.db.transaction('drafts', 'readwrite').objectStore('drafts').delete(id).then((data) => {
        return data;
    });
}

DraftController.prototype.get = function(id) {
    return this.db.transaction('drafts').objectStore('drafts').get(id).then((draft) => {
        return draft;
    });
}

DraftController.prototype.getAll = function () {
    return this.db.transaction('drafts').objectStore('drafts').getAll().then((drafts) => {
        return drafts;
    });
}

DraftController.prototype.addDraft = function (draft) {
    return this.db.transaction('drafts', "readwrite").objectStore('drafts').add({
        name: draft.name,
        url: draft.url,
        description: draft.description
    }).then((draft) => {
        return draft;
    });
}

export default DraftController;