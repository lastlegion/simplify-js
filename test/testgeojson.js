var fs = require("fs");

var points = JSON.parse(fs.readFileSync("testGeojson.json"));
var simplified = JSON.parse(fs.readFileSync("result.json"));

var simplify = require('../simplify'),
    t = require('tape');

t('simplifies points correctly with the given tolerance', function (t) {
    var result = simplify(points, 5);
    t.same(result, simplified);
    t.end();
});
/*
t('just return the points if it has only one point', function(t){
    var result = simplify([{x:1, y:2}]);
    t.same(result, [{x:1, y:2}]);
    t.end();
});

t('just return the points if it has no points', function(t){
    var result = simplify([]);
    t.same(result, []);
    t.end();

});
*/
