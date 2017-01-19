import React from 'react';
import {render} from 'react-dom';
import Portfolio from './portfolio.js';
import Filter from './filter.js';
import Social from './social.js';

render(
    <div>
        <Social />
        <Filter />
        <Portfolio />
    </div>
, document.querySelector('#app'));


// Before live:
// TODO: Testing
// TODO: trema's etc. op leestekens
// TODO: favicon
// TODO: social / sharing meta
// TODO: refactor blocks -> sections ipv divs etc..
// TODO: Comments on code
// TODO: add disclaimer text
// TODO: limit description op homepage on x characters
// TODO: move all styling to "styledcomponents" exept sass functions like variables and darken() etc.
// TODO: create nice buttons -> styled components
// TODO: Remove comments

// After live:
// TODO: url rewriting -> pushstate
// // TODO: popup uniq link in url to link items
// // TODO: Filter uniq url
// TODO: speed of loading items on slow internet! -> performance -> caching?
// TODO: add tests -> testing components -> JEST?
// TODO: more crossbrowser checks
// // TODO: Internet explorer 9 -> focus -> popup not working
// TODO: focus / tab on fields
//
// TODO: fix deprecated Synchronous XMLHttpRequest -> getBlocks()
// TODO: change loading of items -> not via jQuery
// // TODO: use backbone to store items -> filtering
// // TODO: filter items based on type, not with jquery hide -> so next and prev buttons know the next/prev index  with filtered items
// // // TODO: remove check on next/prev button that checks if all items are showed

// Nice to have:
// TODO: crate backend to add items -> django or wordpress?
// TODO: add translations -> load other json
// TODO: create infinite scroll
// // TODO: create range to filter eg. item 3 t/m 15
// TODO: design check / review ->
// TODO: code check / review -> Refactor code
// TODO: Add native videoplayer to play video (depending on videoType in json) -> video - panorama - youtube -> videojs
// TODO: By default not open popup when #popup is in url
