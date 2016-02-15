var restify = require("restify");
var superagent = require("superagent");
var server = restify.createServer();
var simplify = require("./simplify");
var fs = require("fs");
var url = require("url");




function respond(req, res){
    //c0327219-68b2-4a40-9801-fc99e8e1e76f
    console.log(req.query);
    var x1 = req.query.x;
    var y1 = req.query.y;
    var x2 = req.query.x1;
    var y2 = req.query.y1;
    var footprint = req.query.footprint;
    var simplification = req.query.simplification || 0.0012;
    //console.log(x1);
    //console.log(req.params["x2"]);
    //console.log(req.query.getQuery("x1"));
    //console.log(url);
    //var query = url.parse(req.url, true).query;
    //console.log(query);
    var url = "http://imaging.cci.emory.edu:9099/services/TCGA/GeoJSONImageMetaData/query/getMarkups?api_key="+api_key+"&CaseId=TCGA-02-0001-01Z-00-DX1&algorithmId=tammy-test:7&footprint="+footprint+"&x1="+x1+"&y1="+y1+"&x2="+x2+"&y2="+y2+"&";

    console.log(url);
    superagent.get(url)
        .end(function(err, annotations_res){
            //console.log(annotations_res);
            var annotations = JSON.parse(annotations_res.text);
            //console.log(annotations);
            //console.log(annotations[0].geometry.coordinates[0].length);
            //console.log(annotations[0].geometry.coordinates[0].length);
            //var simplified = simplify(annotations[0], 0.2)
            //console.log(simplified.geometry.coordinates[0].length);
            //console.log(annotations[0].geometry.coordinates[0].length);
            //console.log(annotations.geometry.coordinates[0].length);
            var simplified_annotations = [];

            for(var i in annotations){
                //console.log(i);
                var annotation = annotations[i];
                var simplified  = simplify(annotation, 0.00012);
                //console.log(simplified);
                simplified_annotations.push(simplified);
            }
            //console.log(simplified_annotations);


            //var simplified = simplify(annotations, 0.000012);
            //console.log(simplified.geometry.coordinates[0].length);
            //console.log(simplified.geometry.coordinates[0].length);
            res.send(simplified_annotations);
        });

}
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());
//server.use(restify.requestExpiry());

server.use(restify.queryParser());
server.get("/getAnnotations", respond);

var api_key = "";

server.listen(3000, function(){
    api_key = JSON.parse(fs.readFileSync("config.json")).api_key; 

    console.log("%s listening at %s", server.name, server.url);
});
