var builder = require('xmlbuilder');
var uuid = require('node-uuid');
var moment = require('moment');

// default settings per object type
// folder



function xmlobject(objectid, key, value, options) {
    var xml = builder.create('KeyValuePairs', options)
        .ele('ObjectID', objectid)
            .up()
        .ele('Key', key)
            .up()
        .ele('Value', value)
        .end({pretty: true});
    return (xml);
}

module.exports = {
    guid: function() {
        return(uuid.v4());
    },
    init: function() {
        var guid = uuid.v4();
        var xml = builder.create('NewDataSet')
            .ele('repo', {'type': 'guid'}, guid)
            .end({ pretty: true});
        return(xml);
    },
    folder: function(parentguid, name, farray) {
        var guid = uuid.v4();
        var date = moment().format('YYYY/mm/DD H:MM:ss');
        var xml = xmlobject(guid, 'RoyalObjectType', 'RoyalFolder');
        //var array = farray;
        var array = [
            {name: 'ID', value: guid},
            {name: 'Modified', value: date},
            {name: 'Name', value: name},
            {name: 'Created', value: date},
            {name: 'ParentID', value: parentguid}
        ];
        console.log(array,farray);
        var allarray = array.concat(farray);
        allarray.forEach(function(keypair) {
            xml = xml + '\n' + xmlobject(guid, keypair['name'], keypair['value'], {headless: true});
        });
        return(xml);
    },
    terminal: function(name) {
        var terminalid = uuid.v4();
        console.log("terminal: " + name);
    }
};
