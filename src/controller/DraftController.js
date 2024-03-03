import { LinkController } from './LinkController.js';

var DraftController = function (db) {
    this.db = db;
    this.collection_name = "drafts";
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

DraftController.prototype.addToLinks = function (draft_id) {
    return this.db.transaction('drafts').objectStore('drafts').get(draft_id).then((draft) => {
        var linkController = new LinkController(this.db);
        linkController.addLink(draft);
    });
}

export default DraftController;