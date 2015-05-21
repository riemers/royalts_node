var builder = require('xmlbuilder');
var uuid = require('node-uuid');

function object(objectid,key,value) {
    var xml = builder.create('KeyValuePairs')
        .ele('ObjectID', objectid)
            .up()
        .ele('Key', key)
            .up()
        .ele('Value', value)
        .end({pretty: true});
    return (xml);
}

module.exports = {
    init: function(name) {
        return object(uuid.v4(),'Name','Pfinbox');
        var folderid = uuid.v4();
        var xml = builder.create('NewDataSet')
            .ele('repo', {'type': 'guid'}, folderid)
            .end({ pretty: true});
        return(xml);
    },
    folder: function(name) {
        var folderid = uuid.v4();
        console.log("folder troep2, " + name);
    },
    terminal: function(name) {
        var terminalid = uuid.v4();
        console.log("terminal troep, " + name);
    }
};
