var builder = require('xmlbuilder');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');

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
    folder: function(parentguid, name) {
        //console.log("folder: " + name);
        var guid = uuid.v4();
        var date = dateFormat(new Date(), "yyyy/mm/dd H:MM:ss");
        var xml = xmlobject(guid, 'RoyalObjectType', 'RoyalFolder');
        var array = [
            {name: 'ID', value: guid},
            {name: 'Modified', value: date},
            {name: 'Name', value: name},
            {name: 'Created', value: date},
            {name: 'IsExpanded', value: 'False'},
            {name: 'CredentialMode', value: '3'},
            {name: 'CredentialAutologon', value: 'True'},
            {name: 'CredentialFromParent', value: 'True'},
            {name: 'ParentID', value: parentguid}
        ];
        array.forEach(function(keypair) {
            xml = xml + '\n' + xmlobject(guid, keypair['name'], keypair['value'], {headless: true});
        });
        return(xml);
    },
    terminal: function(name) {
        var terminalid = uuid.v4();
        console.log("terminal: " + name);
    }
};
