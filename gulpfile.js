var gulp = require('gulp');
var fs   = require('fs');
var finf = require('find-in-files');
var glob = require("glob");
var path = require('path');
var date = require('date-utils');

var paths = {
    "rootDir": "_dev/",
    "targetSrc": ".(php|css)$",
    "imgSrc": "_dev/img/**/*",
    "logData": "log/"
};
var dt = new Date();
var formatted = dt.toFormat("YYYYMMDDHH24MISS");

gulp.task('findUnimg',function(){
    var pattern = paths.imgSrc;
    glob(pattern, function (err, files) {
        if(err) {
            console.log(err);
        }
        files.forEach(function(file){
            var flag = 0;
            var filename = path.basename(file);
            finf.find(filename,paths.rootDir,paths.targetSrc)
                .then(function(results){
                    if(!(Object.keys(results).length > 0)){
                        fs.appendFile(paths.logData+'log'+formatted+'.log', file+"\n" ,'utf8');
                        console.log(file);
                    }
                }
            );
        });
    });
});