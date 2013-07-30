var http = require('http');

var server = http.createServer(function (req, res){
    console.log("requesting" );
    setTimeout(function(){
        res.end('World\n');
    },2000);

    res.write('Hello ');
});

server.listen( 3000,'localhost');
console.log("server start: port 3000");
