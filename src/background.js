/* global chrome */
import DraftController from "./controller/DraftController";
import { openDB } from 'idb';
var dbProm = openDB('buggy', 1, {
    upgrade(db) {
      db.createObjectStore('links', {
        keyPath: 'id',
        name: 'string',
        url: 'string',
        description: 'string',
        tags: 'array',
        autoIncrement: true
      });
      db.createObjectStore('tags', {
        keyPath: 'id',
        links: 'array',
        autoIncrement: true
      });
      db.createObjectStore('drafts', {
        keyPath: 'id',
        name: 'string',
        url: 'string',
        description: 'string',
        autoIncrement: true
      });
    }
  })

// add Listener for commands
chrome.commands.onCommand.addListener(function (command) {
    console.log(command)
    dbProm.then((db)=>{
        var controller = new DraftController(db);
        chrome.tabs.query({ active: true, lastFocusedWindow: true }).then(([tab])=> {
            console.log(tab);
            controller.addDraft({
                name: tab.title,
                url: tab.url,
                description: '',
            });
        });
    })
});
