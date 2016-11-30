# MHRS - Marine Health Recommendation System

MHRS is recommendation system which analysis various factors affectine marine life in SF bay areay like water temperature, salanity, disolved CO2 and O2 and pH level of the water. 

### Setup Instructions
  - Install MongoDB on cloud or your system and note down the DB connection string
  - Import the meta data of sensors in the database using following command 
  -- "mongoimport --db cmpe239 --collection sensorMetaData --type csv --headerline --file phMetaSensor.csv"
 -- The CSV files are present in csv folder in root of the project
  - The go to server folder and turn on the server by following command
  -- Before turning on the server make sure all test cases passes for server to boot. Run "node tests.js"
  -- node sensorDataCollector.js
 

### Run
  - Run the dashboard / website server as well by going to website directory in root folder and running following command
  -- node app.js
  - You can open the application by going to http://localhost:3001 or you can visit our deployed project on http://cmpe239.ritvick.com
  - To get the data imported in the repository you will have to fire a pst request to http://localhost:3000/getdata
  - For R scripts you will have to download the RStudio and RCompiler and use the data files in CSV folder with prefix "data".

### Any Other instruction
- Make sure to run both the servers 
- One is sensor data collector and other one is website.
- All the analytics and working code is deployed in cloud at http://cmpe239.ritvick.com
- Repo URL is https://github.com/ritvick/cmpe239
