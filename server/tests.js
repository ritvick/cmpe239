const assert = require('assert');
var requestModule = require('request');
var MongoClient = require('mongodb').MongoClient;

function testRepo() {
	console.log("Running Test testRepo()");
	var remoteRepoHost = "http://erddap.cencoos.org/erddap/tabledap";
	requestModule(remoteRepoHost, function (error, res, body) {

		assert(res.statusCode != 200);
		console.log("testRepo() - Success");
	});
}

function testDbConnectivity() {

	console.log("Running Test testDbConnectivity()");
	MongoClient.connect("mongodb://localhost:27017/cmpe239").then(function(db) {

		assert(db != null);
		console.log("testDbConnectivity() - Success");
		return;
	});
}

testRepo();
testDbConnectivity();