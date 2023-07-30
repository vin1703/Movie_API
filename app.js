var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var request = require("request");

app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",function(req,res){
	res.render("home.ejs");
});

app.post("/search",function(req,res){
	var name = req.body.name;
	request("http://www.omdbapi.com/?s="+name+"&apikey=69964189",function(error,response,body){
		if(!error&&response.statusCode==200){
			var data = JSON.parse(body);
			console.log(response);
			res.render("result.ejs",{name:name,data:data});
		}
	});
});

app.listen(3000,function(){
	console.log("Server started at 3000....")
});