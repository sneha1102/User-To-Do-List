const express = require( 'express' );
const bodyparser = require('body-parser');
const mongoose = require( 'mongoose' );
const app = express();

const router = require( './Route/userRoute' );

//Routes
app.use(bodyparser.json())

app.use( '/user', router );

//MongoDb connection
mongoose.connect( "mongodb://localhost/UserDB", {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
	} )
	.then( () => console.log( "Connected To mongodb" ) )
	.catch( ( err ) => res.send( {error: err} ) );

//Server 
app.listen('4000',function(req,res){
	console.log( 'Serve is up and running at the port 4000' );
})
