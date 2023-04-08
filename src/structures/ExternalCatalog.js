const Collection = require('./Collection');
const CatalogItem = require('./CatalogItem');
const Catalog = require('./Catalog');

class ExternalCatalog extends Catalog {
    _patch(data) {
        /**
         * The contact's business profile
         */
        this.isMe = false;

        return super._patch(data);
    }

    /**
    * List all the products on the Catalog
    * @returns {Promise<Array<CatalogItem>>}
    */
    async getProducts() {
        const res = await this.client.pupPage.evaluate(async (userid) => {
            return await window.WWebJS.getCatalogProducts(userid);
        }, this.userid);
        
        return res.map(el => new CatalogItem(this.client, el));
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

module.exports = ExternalCatalog;