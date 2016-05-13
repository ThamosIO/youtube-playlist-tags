// ==UserScript==
// @name         YouTube Playlist Tags
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser.min.js
// @require      https://code.jquery.com/jquery-2.2.3.min.js
// @match        https://www.youtube.com/*/*/list=*
// ==/UserScript==

/* jshint ignore:start */
var inline_src = (<><![CDATA[
/* jshint ignore:end */
/* jshint esnext: true */

let ls = window.localStorage;
let videos = [];
let playlistId = $('#pl-video-list')[0].dataset.playlistId;
let playlist = JSON.parse(ls.getItem(playlistId));
var taggedVideos;

if (playlist) {
  console.info('found playlist');

  taggedVideos = playlist.videos.map(mountTags);
  // taggedVideos.forEach((video) => {
  //   $(
  // });
} else {
  console.info('saving videos');
  // Video crawling first time
  $('#pl-load-more-destination').children('tr').each((index, element) => {
    videos.push(element.dataset.videoId);
  });

  var toSave = [];
  toSave = videos.map((video) => {
    return {
      id: video,
      tags: []
    };
  });

  ls.setItem(playlistId, JSON.stringify({
    videos: toSave
  }));
}


var saveButton = $('<button class="yt-uix-button yt-uix-button-size-default yt-uix-button-default playlist-add-video-button">Save tags</button>');

saveButton.click(saveTags);

$('.playlist-actions').append(saveButton);

function mountTags (video) {
  var videoElement = $("tr[data-video-id='" + video.id + "']");
  var tagHolder = videoElement.find('.pl-video-added-by');

  video.tags.forEach((tag) => {
    tagHolder.append(`<span style="margin:0 2.5px;padding: 2px 5px;background-color:#969090;color:white;border-radius:3px;">${tag}</span>`);
  });
  var addTagHolder = $(`<tr style="padding: 20px 0" data-video-id="${video.id}"></tr>`);
  addTagHolder.append($('<td></td>'));
  addTagHolder.append($('<td></td>'));
  addTagHolder.append($('<td></td>'));
  var tagInputSlot = $('<td><input type="text" placeholder="Add new tag"/></td>');
  var addBtn = $('<button>Add</button>');

  addBtn.click(() => {
    var newTag = addTagHolder.find('input').val();
    console.info(`adding ${newTag} for ${video.id}`);
    video.tags.push(newTag);
    tagHolder.append($(`<span style="margin:0 2.5px;padding: 2px 5px;background-color:#969090;color:white;border-radius:3px;">${newTag}</span>`));
  });

  tagInputSlot.append(addBtn);
  addTagHolder.append(tagInputSlot);
  videoElement.after(addTagHolder);
  return video;
}

function saveTags (event) {
  if (taggedVideos) {
    console.log('saving videos', taggedVideos);
    ls.setItem(playlistId, JSON.stringify({
      videos: taggedVideos
    }));
  }
}

/* jshint ignore:start */
]]></>).toString();
var c = babel.transform(inline_src);
eval(c.code);
/* jshint ignore:end */
