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
}

module.exports = ExternalCatalog;