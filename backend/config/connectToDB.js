const mongoose = require('mongoose');

const connectToDB = () => {

	// mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1/mydatabase', {
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true
	//   })
	mongoose.connect(process.env.DB_URI)

	mongoose.connection.on("connected", () => {
		return console.log("Connected to database sucessfully");
	});

	mongoose.connection.on("error", (err) => {
		return console.log("Error while connecting to database :" + err);
	});	

	mongoose.connection.on("disconnected", () => {
		return console.log("Mongodb connection disconnected");
	});
}

module.exports = connectToDB