/* eslint-disable no-console */
import { Collection as BackboneCollection } from 'backbone';
import ItemModel from '../models/item';


class ItemsCollection extends BackboneCollection {

    get model() {
        return ItemModel;
    }
    // 
    // parse(response) {
    //     return response;
    // }

}

export default ItemsCollection;
