
var Benchmark = require("benchmark");
var simplify = require("../simplify");

var points = require("../test/fixtures/1k.geo.json");

console.log("Benchmarking simplify on " + points.geometery.coordinates[0][0].length + " points...");

new Benchmark.Suite()
.add("simplify (HQ)", function() {
    simplify(points, 1, true);
})
.add("simplify", function() {
    simplify(points, 1, false);
})
.on("cycle", function(event) {
    console.log((event.target));
    //console.log(event);
})
.run();
