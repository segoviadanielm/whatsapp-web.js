'use strict';

const Base = require('./Base');
const Collection = require('./Collection');

/**
 * Represents Catalog on WhatsApp Business
 * @extends {Base}
 */
class Catalog extends Base {
    constructor(client, data) {
        super(client);
        
        if(data) this._patch(data);
    }
    
    _patch(data) {
        this.userId = data.userId;
        return super._patch(data);
    }

    /**
     * List all Collections on the Cataloo
     * @returns {Promise<Array<Collection>>}
     */
    async getCollections() { 
        const res = await this.client.pupPage.evaluate(async () => {
            return await window.WWebJS.getCatalogCollections();
        });
        
        return res.map(collection => new Collection(this.client, collection));
    }
}

module.exports = Catalog;