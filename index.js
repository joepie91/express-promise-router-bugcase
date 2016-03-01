var app = require("express")();
var router = require("express-promise-router")();
var Promise = require("bluebird");

app.use(function(req, res, next) {
	console.log("Incoming request: " + req.method.toUpperCase() + " " + req.url);
	next();
})

router.param("item", function(req, res, next, itemId) {
	console.log("Got itemId");
	req.itemId = itemId;
	return Promise.reject(new Error("Sample error"));
});

router.get("/item/:item", function(req, res) {
	console.log("route /item/:item");
	res.send(req.itemId);
});

router.get("/", function(req, res) {
	console.log("route /");
	res.redirect("/item/42");
});

app.use(router);

app.use(function(req, res, next, err) {
	console.log("Error handling route reached");
	res.status(500).send("Oh noes!");
})

app.listen(3456);