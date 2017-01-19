import { Model } from 'backbone';

class ItemModel extends Model {
    parse(response) {
        if (response.hasOwnProperty('blocks')) {
            return response.blocks;
        }

        return response;
    }
}

export default ItemModel;
