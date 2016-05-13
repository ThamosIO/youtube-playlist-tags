# youtube-playlist-tags

YouTube playlist tags is a simple script that allows adding tags to videos in a playlist.
It is slow, not stylized, and stores the tags and videos in localstorage.

It will be a chrome extension in the future.

Its only purpose is for me to experiment, it was quick & dirty coded.

## Usage

Add this script to tamper monkey ([chrome extension](http://tampermonkey.net/)).

It will run when you reload the page, input for tags are added and you can save the tags using the button "save tags" near the other playlist buttons.
If there is no playlist saved in LocalStorage, it will save in on the firt run, you will have to reload it to add the input and see the tags.
