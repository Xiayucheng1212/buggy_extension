/* global chrome */
import { get } from "react-hook-form";
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
      // update badge count
      chrome.action.getBadgeText({}, (badgeText) => {
        let count = parseInt(badgeText) || 0;
        let add_one_count = (count + 1).toString();
        chrome.action.setBadgeText({ text: add_one_count });
      });
    })
});

chrome.runtime.onInstalled.addListener(() => {
  initDraftCount();
});

chrome.runtime.onStartup.addListener(() => {
  initDraftCount();
});

let initDraftCount = () => {
  dbProm.then((db) => {
    db.transaction('drafts').objectStore('drafts').getAll().then((drafts) => {
        let count = drafts.length ? drafts.length.toString() : '';
        chrome.action.setBadgeText({ text: count });
        // chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
      });
    });
}