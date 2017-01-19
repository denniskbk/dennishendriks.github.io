import $ from 'jquery';
import { View } from 'backbone';

import ItemCollection from '../collections/items';
import ItemModel from '../models/item';


class PortfolioView extends View {

    // get el() {
    //     return '[data-load-remote]';
    // }

    // get events() {
    //     return {
    //         submit: 'onSubmitLoadRemote',
    //     };
    // }

    initialize() {
        console.log('load portfolio view');
        this.getCollectionData();
    }


    getCollectionData() {
        this.collection = new ItemCollection;
        this.model = new ItemModel;
        const url = 'assets/items.json';
        this.collection.url = url;
        this.collection.fetch();
        // console.log(this.collection.fetch());
        this.fetchCollectionData();
    }

    fetchCollectionData() {
        this.collection.fetch({ success: (data) => {

            console.log(data);
            // const mapModel = new Model();

        } });
        // console.log(this.collection);

    }

    // getBlocks() {
    //     $.ajaxSetup({
    //       async: false
    //     });
    //
    //     let blockItems;
    //     $.getJSON('assets/items.json', (data) => {
    //         blockItems = data;
    //     });
    //     return blockItems.blocks.slice(0).sort((a,b) => { return a.year - b.year; }).reverse();
    //
    //     // TODO: fix deprecated Synchronous XMLHttpRequest
    //     // TODO: create range to filter items -> infinite scroll
    //     // TODO: filter items on type
    //     // TODO: crate backend to add items -> django or wordpress?
    // }



    // onSubmitLoadRemote(event) {
    //
    // }

}

export default PortfolioView;
