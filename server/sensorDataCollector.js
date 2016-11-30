// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
//var myData = require('./data.js');
//var GuidSession = require('Guid');
var cookieParser = require('cookie-parser');
var path    = require("path");
var myData = require('./data.js');
var moment = require("moment");

var MongoClient = require('mongodb').MongoClient;
var MongoDb = null;
var requestModule = require('request');


// This package exports the function to create an express instance:
var app = express();
//app.use('/static', express.static('nifty-v2.2'));
app.use('/nifty-v2.2', express.static('nifty-v2.2/template'));

// We can setup ejs now!
app.set('view engine', 'ejs');
//app.set('view engine', 'html');

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

app.get("/raspberryApi",  function (request, response) { 
	console.log(request.query);
	var sensorData = {
		sensorId: request.query.sensorId,
		value: request.query.temperature
	};

	response.send(myData.storePhysicalSensorData(sensorData));
	


	
});

app.get("/dashboard", function(request, response) {

	MongoDb.collection('physicalSensorsData', function(err, collection) {

		collection.find({}).sort({$natural:-1}).limit(1).toArray().then(function(sensorData){
			console.log(sensorData[0]);
			response.render("dashboard", {sensorData: sensorData[0]});
		});

	});

	
	
	 

});

app.post("/getdata", function(request, response) {

	console.log(request.body);

	myData.getAllSensors().then(function(listOfSensors) {
		
		for(var ctr = 0; ctr < listOfSensors.length; ctr++) {

			var phySensor = listOfSensors[ctr];

			

				var sensor = phySensor.sensor;
				//console.log(phySensor);
				console.log(sensor);

				var breakSensor = sensor.split(':');
				console.log(breakSensor);
				var sensorType = breakSensor.pop();
				console.log(sensorType);
				var dataSetId;
				if(sensorType == "wave_height_and_direction") {
					parameterArray = ["Wind Wave Height", "Wind From Direction", "Wind Speed", "Barometric Pressure"];
					
				}else if(sensorType == "water_temperature") {
					parameterArray = ["Water Temperature"];
				}else if(sensorType == "ph") {

					//Calculate dataSetId
					dataSetId = sensor.replace("urn:ioos:sensor:", "");
					dataSetId = dataSetId.split(":ph").join("");
					dataSetId = dataSetId.split(":").join("_");
					dataSetId = dataSetId.split(".").join("_");
					dataSetId = dataSetId.toLowerCase();

					parameterArray = ["sea_water_ph_reported_on_total_scale", "sea_water_practical_salinity"];
				}
				//console.log(parameter);

				var station = breakSensor.join(':');
				var station = phySensor.station;
				//console.log(station);
				var time = moment().subtract(48, "hours").toISOString();
				//console.log(time);

				for(parameterCtr = 0; parameterCtr < parameterArray.length; parameterCtr++) {

					parameter = parameterArray[parameterCtr];
					var remoteRepoHost = "http://erddap.cencoos.org/erddap/tabledap";
					var remoteRepoPath = "/"+ dataSetId  +".json?time," + parameter;
					remoteRepoPath += "&time>=" + time;
					//remoteRepoPath += '&station="' + station + '"';
					//remoteRepoPath += "&parameter=";
					//remoteRepoPath += '"' + parameter + '"';

					
					console.log(remoteRepoHost+remoteRepoPath);
					
					requestModule(remoteRepoHost+remoteRepoPath, function (error, res, body) {
						
						  if (!error && res.statusCode == 200) {
						    // Print the google web page.
						    console.log(body);
						    body = JSON.parse(body);
						     console.log(body.table);

						    for(var i = 0; i < body.table.rows.length; i++) {

						    	

						    	var doc = {};
						    	doc['phySensor'] = phySensor._id;

						    	for(columnNameCtr = 0; columnNameCtr < body.table.columnNames.length; columnNameCtr ++) {
						    		var key = body.table.columnNames[columnNameCtr];

						    		doc[key] = body.table.rows[i][columnNameCtr];
						    	}

						    	console.log(doc);
						    	myData.storePhysicalSensorData(doc);
						    	

						    }



						  }
						  else {
						    	console.log(remoteRepoHost+remoteRepoPath);
						    	console.log('Error Code = ' + res.statusCode);
						    }
					});


				}



			


		}

		response.send("OK" + time());

	});
	
	/**
	myData.getAllSensors().then(function(listOfSensors) {
		console.log('Inside GetAllSensors Call');

		for(var sensorCtr = 0; sensorCtr < listOfSensors.length; sensorCtr++) {

			var sensor = listOfSensors[sensorCtr].sensor;
			var phySensor = listOfSensors[sensorCtr];

						
				
		}


	}); //getAllSensor Ends here
	
	**/
	
	

});

// We can now navigate to localhost:3001
app.listen(3000, function () {
    console.log('Sensor Data collector listening at 3000');
});

