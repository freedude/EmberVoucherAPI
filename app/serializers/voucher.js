import ApplicationSerializer from './application';
import ENV from 'phorest-techtest-sean-freeman/config/environment';
import { dasherize } from '@ember/string';


export default ApplicationSerializer.extend({
    serialize(snapshot) {
        let json = {};

        snapshot.eachAttribute((name) => {
            if (snapshot.attr(name) !== undefined) {
                json[name] = snapshot.attr(name);
            }
        });

        json.creatingBranchId = ENV.API.branchId;
        return json;
    },

    normalizeCreateRecordResponse(store, primaryModelClass, payload) {
        let modelName = primaryModelClass.modelName;
        let data = {
            attributes: {}
        };
        let recordId = payload[`${modelName}Id`];

        delete payload[`${modelName}Id`];

        for (let key in payload) {
            data.attributes[dasherize(key)] = payload[key];
            delete payload[key];
        }
        payload.data = data;
        payload.data.type = modelName;
        payload.data.id = recordId;

        return this._super(...arguments);
    }
});
