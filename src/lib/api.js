var urllib = require('urllib');

var api = function (bundleInterface) {

    var _interface = bundleInterface || {};

    var obj = {};

    obj.request = function (params, callback) {

        var _callback,
            _queryString;

        // callback                
        if (callback && typeof callback === 'function') {
            _callback = callback;
        } else {
            _callback = function(err,data){
                console.log(err,data);
            };
        }
        
        // queryString
        _queryString = _interface.getQueryString(params);
        
        urllib.request(_queryString, {
            method: 'GET',
            headers: {
                'ETAG': 'MT-NODE'
            }
        }, function (err, data, res) {
            
            if (err) {                
                _callback(true,err);                
                throw err;
                return; 
            }            
            
            var jsonStr = data.toString();
            _callback(null, jsonStr);            

        });
    };

    return obj;
};


module.exports = api;
