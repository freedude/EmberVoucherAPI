import Controller from '@ember/controller';

export default Controller.extend({
    isLoadingClients: false,
    searchComplete: false,

    init() {
        this._super(...arguments);
    },

    actions: {
        
        searchClient(query) {

            this.set('searchComplete', true);

            Object.entries(query).forEach(([key, value]) => {
                if (value.length === 0) {
                    delete query[key];
                }
            });

            if (Object.keys(query).length === 0) {
                
                this.set('model.clients', this.store.findAll('client'));
                return false;
            }

            this.set('isLoadingClients', true);
            let filteredClients = this.store.query('client', query); // GET Request

            this.set('model.clients', filteredClients); // SET model.clients to the result

            filteredClients.then(() => {
                this.set('isLoadingClients', false);

            })
        },

    

    }
});