import uuid from 'node-uuid';
import moment from 'moment';
import js2xmlparser from 'js2xmlparser';
import rtsd from './objectdefaults';

export default {
    object(parentguid, name, type, cb) {
        const guid = uuid.v4();
        const date = moment().format('YYYY/mm/DD H:MM:ss');
        const array = [
            { name: 'RoyalObjectType', value: type },
            { name: 'ID', value: guid },
            { name: 'Modified', value: date },
            { name: 'Name', value: name },
            { name: 'Created', value: date },
            { name: 'ParentID', value: parentguid }
        ];
        cb(array.concat(rtsd[type]), guid);

    },
    generate(data) {
        return js2xmlparser("NewDataSet", data);
    }
};