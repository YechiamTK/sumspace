/***
 * index.ts = boostrap file: 
 * initializing the node server using express.
 * connect to the mongo client.
 * loading up the various server-related files.
 */

import express from 'express';
import path from 'path';
//import { connectToDb, keepAwake } from './utils/db_connections';
import { findTagsOid, getArticlesNames, getArticlesNamesAndOid, getAuthorsNames, getSummaries,
   loadFile, loginUser, newArticle, newAuthor, newSummary, newTags, registerUser } from './server_utils/restful_connections';
import { Mongoose } from 'mongoose';


//set up useful consts:
const app = express();
const router = express.Router();
const port = 3080;
const db = 'mongodb://localhost:27017/SumSpace';

//declare static files used:
app.use(express.static('../app-dir/build'));


//start the app:
//const mongo = connectToDb(db);
const mongoose = new Mongoose();


const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}

//connect to the db and start working
mongoose.connect(db, options).then(async ()=>{
  console.log("Successfully connected to the db!");
  try {
    //set up login screen api
    loginUser(router, mongoose);
    registerUser(router, mongoose);

    //set up author api
    newAuthor(router, mongoose);
    getAuthorsNames(router, mongoose);
   
    //set up articles api
    newArticle(router, mongoose);
    getArticlesNamesAndOid(router, mongoose);
    getArticlesNames(router, mongoose);

    //set up summary api
    getSummaries(router, mongoose);
    newSummary(router, mongoose);

    //set up tag api
    findTagsOid(router, mongoose);
    newTags(router, mongoose);
    
    
    // Handles any requests that don't match the ones above
    loadFile(router, '*', path.join(__dirname,'../app-dir/build/index.html'));
  }
  catch(err){
    console.log(err);
  }
},err=>{
  console.log(err);
});


//connection monitor;
//will do with this something later
mongoose.connection.on('error',err=>{
  console.log(err);
});
mongoose.connection.on('disconnected', err=>{
  console.log(err);
});



//set up app
app.use(express.json());
app.use('/', router);


app.listen(port, () => {
  /* if (err) {
    return console.error(err);
  } */
  return console.log(`server is listening on ${port}`);
}); 