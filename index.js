var uuid = require('node-uuid');
var moment = require('moment');
var js2xmlparser = require('js2xmlparser');
var rtsd = require('./objectdefaults');

module.exports = {
    object: function(parentguid, name, type, cb) {
        var guid = uuid.v4();
        var date = moment().format('YYYY/mm/DD H:MM:ss');

        var jsonStr ='{ "KeyValuePairs": [ ] }';
        var jsonObj = JSON.parse(jsonStr);
        //should test if it actually is a valid json object
        jsonObj.KeyValuePairs.push ({ "ObjectID": guid, "Key": "RoyalObjectType", "Value": type });
        var array = [
            {name: 'ID', value: guid},
            {name: 'Modified', value: date},
            {name: 'Name', value: name},
            {name: 'Created', value: date},
            {name: 'ParentID', value: parentguid}
        ];
        var allarray = array.concat(rtsd[type]);
        allarray.forEach(function(keypair) {
            jsonObj.KeyValuePairs.push ({ "ObjectID": guid, "Key": keypair['name'], "Value": keypair['value'] });
        });

        cb(jsonObj, guid);

    },
    generate: function(data) {
        return js2xmlparser("NewDataSet", data);
    },
    savegenerate: function(data,res,filename) {
        if (typeof filename =="undefined") filename = "royaldocument";
        filename = filename + '.rtsz';
        res.setHeader("Content-Type", "application/x-gzip");
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        return js2xmlparser("NewDataSet", data);
    }
};
