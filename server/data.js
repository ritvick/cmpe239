var MongoClient = require('mongodb').MongoClient;

 // Connect to the db
 /**
MongoClient.connect("mongodb://localhost:27017/sensorcloud", function(err, db) {
	console.log('Mongo DB connected');
  if(err) { return console.dir(err); }
MongoDb = db;
  

 

});
**/
MongoClient.connect("mongodb://cmpe239:cmpe239@ds111788.mlab.com:11788/cmpe239").then(function(db) {

	console.log('Mongo DB connected');
	var sensorMetaDataCollection  = db.collection("sensorMetaData");
	var physicalSensorsDataCollection = db.collection("physicalSensorsData");

	exports.storePhysicalSensorData = function(sensorData) {

		
			physicalSensorsDataCollection.insert(sensorData, {w:1}, function(err, result) {
				console.log(result);
				return "OK";
			});
			
	  	

	}

	
	exports.getAllSensors = function() {
		return sensorMetaDataCollection.find({}).toArray().then(function(listOfSensors) {
			if(listOfSensors.length === 0 ) return Promise.reject("Could not sensor with sensor key value" + sensor);
			
			console.log('Returning List of sensors');

			return listOfSensors;
		});
	};
	


});