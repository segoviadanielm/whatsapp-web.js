const CatalogItem = require('./CatalogItem');
const Catalog  = require('./Catalog');

class PersonalCatalog extends Catalog {
    _patch(data) {
        /**
         * The contact's business profile
         */
        this.isMe = true;

        return super._patch(data);
    }

    /**
    * List all the products on the Catalog
    * @returns {Promise<Array<CatalogItem>>}
    */
    async getProducts() {
        const res = await this.client.pupPage.evaluate(async () => {
            return await window.WWebJS.getMeCatalog();
        });
        
        return res.map(el => new CatalogItem(this.client, el));
    }
}

module.exports = PersonalCatalog;