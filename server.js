var http = require('http');
var url = require('url');
var redis_lib = require("redis");

http.createServer(function (req, res) {
  var query = url.parse(req.url, true).query;
  var redis = redis_lib.createClient();
  
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  
  redis.on("error", function (err) {
    console.log("Error " + err);
  });
  
  if(query.key) {
    if(query.val) {
      redis.hset(["kv_repo", query.key, query.val], function(err, reply) {
        redis.end();
        res.end();
      });
    }
    else {
      redis.hget(["kv_repo", query.key], function(err, reply) {
        redis.end();
        res.end(reply);
      });
    }
  }
  else {
    redis.hgetall(["kv_repo"], function(err, reply) {
      if(reply) {
         Object.keys(reply).forEach(function(key) {
          res.write(key + ": " + reply[key] + "\n");
        });
      }
    redis.end();
    res.end();
    });
  }
}).listen(80);